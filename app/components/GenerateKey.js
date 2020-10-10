var JakartaTime  = new Date().toLocaleString("en-US", {timeZone: "Asia/Jakarta"});
var Today  = new Date(JakartaTime);
var GenerateKey = Today.getTime();
export default GenerateKey;