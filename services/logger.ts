export default function logger(message: string) {
  const timestamp = new Date().toLocaleTimeString();

  console.log(`[${timestamp}] ${message}`);
}
