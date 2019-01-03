export function convertObjectToBase64(object: any) : string{
  const json = JSON.stringify(object);
  return Buffer.from(json).toString("base64");
}

export function readObjectFromBase64(base64String : string) : any {
  const converted = Buffer.from(base64String, "base64").toString("ascii");
  return JSON.parse(converted);
}
