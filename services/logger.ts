export default function logger(...args: any[]) {
  const timestamp = new Date().toLocaleTimeString();
  console.log(`[${timestamp}]`, ...args);
}
