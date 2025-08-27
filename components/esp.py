import json
import asyncio
import websockets
import re
import sys
import argparse
from datetime import datetime
import threading
import time

# Fix serial import issue
try:
    import serial
    import serial.tools.list_ports
    from serial import SerialException
    print("✅ PySerial imported successfully")
except ImportError as e:
    print(f"❌ PySerial import error: {e}")
    print("💡 Install with: pip install pyserial")
    sys.exit(1)
except Exception as e:
    print(f"❌ Serial module error: {e}")
    print("💡 Try: pip uninstall pyserial serial && pip install pyserial")
    sys.exit(1)

# Simple ObjectId replacement
def generate_object_id():
    import random
    import string
    return ''.join(random.choices(string.ascii_lowercase + string.digits, k=24))

class COMDeviceConverter:
    def __init__(self, com_port='COM7', baud_rate=115200, ws_port=8001):
        self.running = True
        self.serial_connections = {}  # Store multiple serial connections
        self.soldier_clients = set()
        
        # Dynamic port configuration based on user input
        self.port_configs = [
            {'port': com_port, 'baud': baud_rate}
        ]
        
        # Store latest soldier positions
        self.soldier_positions = {}
        
        # Indian military call signs
        self.call_signs = {
            1: "868MHz", 2: "868MHz", 3: "868MHz", 4: "868MHz", 5: "868MHz",
            6: "868MHz", 7: "868MHz", 8: "868MHz", 9: "868MHz", 10: "868MHz",
            11: "868MHz", 12: "868MHz", 13: "868MHz", 14: "868MHz", 15: "868MHz"
        }
        
        # Team assignments - alternating Red/Blue
        self.team_assignments = {
            1: "team_red", 2: "team_blue", 3: "team_red", 4: "team_blue", 5: "team_red",
            6: "team_blue", 7: "team_red", 8: "team_blue", 9: "team_red", 10: "team_blue",
            11: "team_red", 12: "team_blue", 13: "team_red", 14: "team_blue", 15: "team_red"
        }
        
        self.ws_port = ws_port

    def parse_coordinate(self, coord_str):
        """Parse coordinate string like '28.6139N' or '77.2090E' to decimal degrees"""
        try:
            if not coord_str or coord_str in ['00', '0', '']:
                return 0.0
            
            # Remove any whitespace
            coord_str = coord_str.strip()
            
            # Check if it's just numbers (like '00')
            if coord_str.isdigit():
                return 0.0
            
            # Extract direction (N, S, E, W)
            direction = coord_str[-1].upper()
            
            # Extract numeric part
            numeric_part = coord_str[:-1]
            
            # Convert to float
            decimal_value = float(numeric_part)
            
            # Apply direction (South and West are negative)
            if direction in ['S', 'W']:
                decimal_value = -decimal_value
            
            return round(decimal_value, 6)
            
        except Exception as e:
            print(f"❌ GPS coordinate parsing error for '{coord_str}': {e}")
            return 0.0

    def convert_gps_coordinates(self, lat_str, lng_str):
        """Convert GPS coordinates from string format to decimal degrees"""
        try:
            lat = self.parse_coordinate(lat_str)
            lng = self.parse_coordinate(lng_str)
            
            # If coordinates are invalid, use default Gurugram coordinates
            if lat == 0.0 and lng == 0.0:
                return 28.4595, 77.0266
            
            return lat, lng
            
        except Exception:
            # Return default coordinates if conversion fails
            return 28.4595, 77.0266

    def list_available_ports(self):
        """List all available COM ports"""
        try:
            print("🔍 Scanning available COM ports...")
            ports = serial.tools.list_ports.comports()
            
            if not ports:
                print("❌ No COM ports found!")
                return []
            
            available_ports = []
            for port in ports:
                print(f"   📡 {port.device}: {port.description}")
                available_ports.append(port.device)
            
            return available_ports
            
        except Exception as e:
            print(f"❌ Error listing ports: {e}")
            return []

    def connect_to_device(self, port, baud_rate):
        """Connect to device on specified port and baud rate with better error handling"""
        try:
            connection_key = f"{port}_{baud_rate}"
            
            # Close existing connection if any
            if connection_key in self.serial_connections:
                try:
                    self.serial_connections[connection_key].close()
                    time.sleep(1)  # Give more time for port to close
                except:
                    pass
                del self.serial_connections[connection_key]
            
            print(f"🔌 Connecting to {port} @ {baud_rate} baud...")
            
            # Check if port exists first
            available_ports = self.list_available_ports()
            if port not in available_ports:
                print(f"❌ Port {port} not found in system!")
                print(f"💡 Available ports: {available_ports}")
                return False
            
            serial_conn = serial.Serial(
                port=port,
                baudrate=baud_rate,
                bytesize=8,
                parity='N',
                stopbits=1,
                timeout=0.1,
                xonxoff=False,
                rtscts=False,
                dsrdtr=False
            )
            
            time.sleep(2)  # Give more time for connection to stabilize
            serial_conn.flushInput()
            serial_conn.flushOutput()
            
            # Test if device is sending data
            test_start = time.time()
            test_data = ""
            print(f"🧪 Testing {port} for data (5 seconds)...")
            
            while time.time() - test_start < 5:  # Test for 5 seconds
                try:
                    if serial_conn.in_waiting > 0:
                        chunk = serial_conn.read(serial_conn.in_waiting).decode('utf-8', errors='ignore')
                        test_data += chunk
                        print(f"📥 Received: {chunk[:50]}...")
                        
                        if len(test_data) > 20:  # If we get decent amount of data
                            break
                except Exception as read_error:
                    print(f"⚠️ Read error during test: {read_error}")
                    break
                    
                time.sleep(0.1)
            
            if test_data and len(test_data) > 5:
                self.serial_connections[connection_key] = serial_conn
                print(f"✅ Successfully connected to {port} @ {baud_rate} baud!")
                print(f"📊 Sample data ({len(test_data)} bytes): {test_data[:100]}...")
                return True
            else:
                print(f"⚠️ Connected to {port} but no data received")
                print("💡 Device might not be sending data or using different settings")
                serial_conn.close()
                return False
                
        except PermissionError:
            print(f"❌ Permission denied for {port}")
            print("💡 Possible solutions:")
            print("   • Close any other applications using this port (Arduino IDE, PuTTY, etc.)")
            print("   • Run this script as Administrator")
            print("   • Check if another instance of this script is running")
            print("   • Unplug and replug the device")
            return False
            
        except SerialException as e:
            print(f"❌ Serial connection error for {port}: {e}")
            if "could not open port" in str(e):
                print("💡 Port might be in use by another application")
            elif "access is denied" in str(e).lower():
                print("💡 Run as Administrator or close other programs using this port")
            return False
            
        except Exception as e:
            print(f"❌ Unexpected error connecting to {port}: {e}")
            import traceback
            traceback.print_exc()
            return False

    def scan_and_connect_devices(self):
        """Scan all port/baud combinations and connect to active ones"""
        print("🔍 Scanning for devices...")
        
        # First, list all available ports
        available_ports = self.list_available_ports()
        if not available_ports:
            print("❌ No COM ports detected!")
            return False
        
        active_connections = 0
        
        for config in self.port_configs:
            if config['port'] in available_ports:
                if self.connect_to_device(config['port'], config['baud']):
                    active_connections += 1
            else:
                print(f"⚠️ {config['port']} not available in system")
        
        if active_connections > 0:
            print(f"✅ Connected to {active_connections} device(s)")
            return True
        else:
            print("❌ No active devices found")
            print("💡 Troubleshooting tips:")
            print("   • Make sure your device is plugged in")
            print("   • Check if the device is working (LED indicators)")
            print("   • Try a different USB cable")
            print("   • Check Device Manager for COM port issues")
            print("   • Restart the device")
            print("   • Try different baud rates: 9600, 115200")
            return False

    def parse_esp_data(self, raw_data):
        """Parse new ESP data format: {module,frequency,person_id,lat,lon,*checksum}"""
        parsed_packets = []
        
        # Find all complete packets between { and }
        i = 0
        while i < len(raw_data):
            # Look for opening bracket
            start = raw_data.find('{', i)
            if start == -1:
                break
                
            # Look for closing bracket after opening
            end = raw_data.find('}', start)
            if end == -1:
                # No closing bracket found - this is an error
                print(f"❌ ERROR: Incomplete packet - missing closing bracket: {raw_data[start:start+50]}...")
                break
            
            # Extract packet content between brackets
            packet_content = raw_data[start+1:end]  # Remove { and }
            
            try:
                values = [x.strip() for x in packet_content.split(',')]
                print(f"🔍 Raw packet: {packet_content}")
                print(f"📊 Field count: {len(values)}")
                
                # Handle packets with exactly 5 fields as per new format
                if len(values) == 5:
                    try:
                        # Parse according to new data structure
                        # Format: {module,frequency,person_id,lat,lon,*checksum}
                        module = values[0].strip()
                        frequency = values[1].strip()
                        person_id = int(values[2]) if values[2] and values[2].isdigit() else 1
                        lat_str = values[3].strip()
                        lon_str = values[4].strip()
                        
                        # Handle checksum if present (remove *XX)
                        if '*' in lon_str:
                            lon_str = lon_str.split('*')[0].strip()
                        
                        # Convert GPS coordinates
                        converted_lat, converted_lng = self.convert_gps_coordinates(lat_str, lon_str)
                        
                        # Create packet with parsed data
                        packet = {
                            'soldier_id': person_id,
                            'module': module,
                            'frequency': frequency,
                            'latitude': converted_lat,
                            'longitude': converted_lng,
                            'raw_lat': lat_str,
                            'raw_lon': lon_str
                        }
                        
                        parsed_packets.append(packet)
                        
                        # Get team for logging
                        team = self.team_assignments.get(person_id, "team_red")
                        call_sign = self.call_signs.get(person_id, f"soldier_{person_id}")
                        print(f"✅ Valid packet: {call_sign} (ID: {person_id}, {team}) at ({converted_lat:.6f}, {converted_lng:.6f})")
                        print(f"   📡 Module: {module}, Frequency: {frequency}")
                        
                    except (ValueError, IndexError) as e:
                        print(f"❌ ERROR: Invalid data in packet {packet_content}: {e}")
                        
                else:
                    print(f"❌ ERROR: Invalid packet length ({len(values)} fields, expected 5): {packet_content}")
                    print(f"📋 Fields received: {values}")
                    
            except Exception as e:
                print(f"❌ ERROR: Failed to parse packet {packet_content}: {e}")
            
            # Move to next potential packet
            i = end + 1
        
        return parsed_packets

    def format_soldier_data(self, packet):
        """Format data for soldier WebSocket"""
        team = self.team_assignments.get(packet['soldier_id'], "team_red")
        call_sign = self.call_signs.get(packet['soldier_id'], f"soldier_{packet['soldier_id']}")
        
        return {
            "soldier_id": str(packet['soldier_id']),
            "call_sign": call_sign,
            "team": team,
            "module": packet['module'],
            "frequency": packet['frequency'],
            "gps": {
                "latitude": packet['latitude'],
                "longitude": packet['longitude'],
                "raw_lat": packet['raw_lat'],
                "raw_lon": packet['raw_lon']
            },
            "timestamp": datetime.now().isoformat(),
            "_id": generate_object_id()
        }

    async def broadcast_to_clients(self, clients, data):
        """Broadcast data to WebSocket clients"""
        if clients:
            message = json.dumps(data)
            clients_copy = clients.copy()
            for client in clients_copy:
                try:
                    await client.send(message)
                except:
                    clients.discard(client)

    async def soldier_data_handler(self, websocket, path=None):
        """Handle soldier data connections"""
        self.soldier_clients.add(websocket)
        print(f"🔗 Soldier client connected. Total: {len(self.soldier_clients)}")
        try:
            await websocket.wait_closed()
        finally:
            self.soldier_clients.discard(websocket)
            print(f"📤 Soldier client disconnected. Total: {len(self.soldier_clients)}")

    def multi_port_reader_thread(self):
        """Read data from multiple devices simultaneously with improved error handling"""
        buffers = {}  # Separate buffer for each connection
        packet_count = 0
        consecutive_errors = {}  # Track consecutive errors per connection
        
        print("📡 Multi-port reader started")
        
        while self.running:
            try:
                # Check if we have any connections, if not try to reconnect
                if not self.serial_connections:
                    print("🔄 No active connections, scanning for devices...")
                    if self.scan_and_connect_devices():
                        # Initialize buffers for new connections
                        for conn_key in self.serial_connections:
                            buffers[conn_key] = ""
                            consecutive_errors[conn_key] = 0
                    else:
                        print("⏳ Waiting 10 seconds before retry...")
                        time.sleep(10)  # Wait longer between retries
                        continue
                
                # Read from all active connections
                connections_to_remove = []
                
                for conn_key, serial_conn in list(self.serial_connections.items()):
                    try:
                        # Check if connection is still valid
                        if not serial_conn or not hasattr(serial_conn, 'is_open') or not serial_conn.is_open:
                            print(f"❌ Connection {conn_key} is not open")
                            connections_to_remove.append(conn_key)
                            continue
                            
                        # Initialize buffer if not exists
                        if conn_key not in buffers:
                            buffers[conn_key] = ""
                            consecutive_errors[conn_key] = 0
                        
                        # Read data if available
                        if serial_conn.in_waiting > 0:
                            try:
                                raw_data = serial_conn.read(serial_conn.in_waiting).decode('utf-8', errors='ignore')
                                buffers[conn_key] += raw_data
                                consecutive_errors[conn_key] = 0  # Reset error count on successful read
                                
                                # Process packets from this connection's buffer
                                while '{' in buffers[conn_key] and '}' in buffers[conn_key]:
                                    start = buffers[conn_key].find('{')
                                    end = buffers[conn_key].find('}', start)
                                    
                                    if start != -1 and end != -1 and end > start:
                                        # Extract complete packet including brackets
                                        packet_str = buffers[conn_key][start:end+1]
                                        buffers[conn_key] = buffers[conn_key][end+1:]
                                        
                                        # Validate packet format
                                        if packet_str.startswith('{') and packet_str.endswith('}'):
                                            packets = self.parse_esp_data(packet_str)
                                            for packet in packets:
                                                packet_count += 1
                                                print(f"📦 Packet #{packet_count} from {conn_key}: Soldier {packet['soldier_id']}")
                                                
                                                # Process packet immediately
                                                if hasattr(self, 'loop') and self.loop and not self.loop.is_closed():
                                                    try:
                                                        asyncio.run_coroutine_threadsafe(
                                                            self.process_packet(packet), 
                                                            self.loop
                                                        )
                                                    except RuntimeError as e:
                                                        print(f"⚠️ Event loop error: {e}")
                                        else:
                                            print(f"❌ ERROR: Invalid packet format: {packet_str}")
                                    else:
                                        # No complete packet found, wait for more data
                                        break
                            
                            except Exception as e:
                                consecutive_errors[conn_key] = consecutive_errors.get(conn_key, 0) + 1
                                print(f"❌ Read error from {conn_key} (error #{consecutive_errors[conn_key]}): {e}")
                                
                                # Remove connection after too many consecutive errors
                                if consecutive_errors[conn_key] > 5:
                                    print(f"🚫 Too many errors for {conn_key}, removing connection")
                                    connections_to_remove.append(conn_key)
                    
                    except Exception as e:
                        print(f"❌ Connection error {conn_key}: {e}")
                        connections_to_remove.append(conn_key)
                
                # Remove failed connections
                for conn_key in connections_to_remove:
                    if conn_key in self.serial_connections:
                        try:
                            self.serial_connections[conn_key].close()
                        except:
                            pass
                        del self.serial_connections[conn_key]
                        if conn_key in buffers:
                            del buffers[conn_key]
                        if conn_key in consecutive_errors:
                            del consecutive_errors[conn_key]
                        print(f"🗑️ Removed failed connection: {conn_key}")
                
                time.sleep(0.01)  # Fast polling
                
            except Exception as e:
                print(f"❌ Thread error: {e}")
                import traceback
                traceback.print_exc()
                time.sleep(2)  # Wait longer after thread errors

    async def process_packet(self, packet):
        """Process and broadcast packet data"""
        try:
            print(f"\n🔄 PROCESSING PACKET: Soldier {packet['soldier_id']}")
            print(f"   📊 Module: {packet['module']}, Frequency: {packet['frequency']}")
            print(f"   🗺️ GPS: {packet['latitude']:.6f}, {packet['longitude']:.6f}")
            
            # Update position
            self.soldier_positions[packet['soldier_id']] = {
                'latitude': packet['latitude'],
                'longitude': packet['longitude']
            }
            
            # Send soldier data to all clients
            soldier_data = self.format_soldier_data(packet)
            await self.broadcast_to_clients(self.soldier_clients, soldier_data)
            print(f"   📡 Data sent to {len(self.soldier_clients)} clients")
            
            print(f"✅ PACKET PROCESSING COMPLETE for Soldier {packet['soldier_id']}\n")
            
        except Exception as e:
            print(f"❌ Process error: {e}")
            import traceback
            traceback.print_exc()

    async def keep_alive(self):
        """Keep server running"""
        while self.running:
            await asyncio.sleep(1)

    async def start_servers(self):
        """Start WebSocket server"""
        print("🚀 Starting server...")
        
        try:
            soldier_server = websockets.serve(self.soldier_data_handler, "localhost", self.ws_port)
            keep_alive = self.keep_alive()
            
            print("✅ Server running:")
            print(f"   📡 ws://localhost:{self.ws_port}/ws (soldier data)")
            print("\n🎮 Ready for device data!")
            print(f"🔌 Monitoring {self.port_configs[0]['port']} at {self.port_configs[0]['baud']} baud")
            print("📊 New data format: {module,frequency,person_id,lat,lon,*checksum}")
            print("Press Ctrl+C to stop\n")
            
            await asyncio.gather(
                soldier_server,
                keep_alive,
                return_exceptions=True
            )
        except Exception as e:
            print(f"❌ Server error: {e}")
            raise

    def run(self):
        """Main run method"""
        port_info = self.port_configs[0]
        print("=" * 60)
        print("🎯 COM Device WebSocket Converter")
        print(f"📡 Monitoring {port_info['port']} @ {port_info['baud']} baud")
        print("🔒 New packet format: {module,frequency,person_id,lat,lon}")
        print("🇮🇳 Indian call signs")
        print("🗺️ GPS coordinate conversion")
        print(f"📡 Single WebSocket server on port {self.ws_port}")
        print("=" * 60)
        
        # Create event loop
        try:
            self.loop = asyncio.new_event_loop()
            asyncio.set_event_loop(self.loop)
            
            # Start multi-port reader
            reader_thread = threading.Thread(target=self.multi_port_reader_thread, daemon=True)
            reader_thread.start()
            
            self.loop.run_until_complete(self.start_servers())
            
        except KeyboardInterrupt:
            print("\n🛑 Stopping...")
        except Exception as e:
            print(f"❌ Error: {e}")
            import traceback
            traceback.print_exc()
        finally:
            self.running = False
            
            # Close all serial connections
            for conn_key, serial_conn in list(self.serial_connections.items()):
                try:
                    if serial_conn and hasattr(serial_conn, 'close'):
                        serial_conn.close()
                        print(f"🔌 Closed {conn_key}")
                except Exception:
                    pass
            
            # Clean up event loop
            try:
                if hasattr(self, 'loop') and self.loop and not self.loop.is_closed():
                    pending = asyncio.all_tasks(self.loop)
                    for task in pending:
                        task.cancel()
                    if pending:
                        self.loop.run_until_complete(asyncio.gather(*pending, return_exceptions=True))
                    self.loop.close()
            except Exception as e:
                print(f"⚠️ Loop cleanup error: {e}")
            
            print("✅ Stopped")

def main():
    """Main function with command line argument parsing"""
    parser = argparse.ArgumentParser(description='COM Device WebSocket Converter')
    parser.add_argument('port', nargs='?', default='COM7', help='COM port (e.g., COM3, COM7)')
    parser.add_argument('--baud', type=int, default=115200, help='Baud rate (default: 115200)')
    parser.add_argument('--ws-port', type=int, default=8001, help='WebSocket server port (default: 8001)')
    
    args = parser.parse_args()
    
    # Validate COM port format
    if not args.port.upper().startswith('COM'):
        print(f"❌ Invalid COM port format: {args.port}")
        print("💡 Please use format like: COM3, COM7, etc.")
        sys.exit(1)
    
    # Validate baud rate
    valid_baud_rates = [9600, 19200, 38400, 57600, 115200]
    if args.baud not in valid_baud_rates:
        print(f"❌ Invalid baud rate: {args.baud}")
        print(f"💡 Valid baud rates: {valid_baud_rates}")
        sys.exit(1)
    
    print(f"🎯 Starting converter with port: {args.port.upper()} @ {args.baud} baud, WS port: {args.ws_port}")
    
    converter = COMDeviceConverter(com_port=args.port.upper(), baud_rate=args.baud, ws_port=args.ws_port)
    converter.run()

if __name__ == "__main__":
    main()