// import privateKey from '@/../privateKey.pem';
import rs from 'jsrsasign'

class TokenService {
  getLocalAccessToken() {
    const access_token = localStorage.getItem("access_token");
    return access_token;
  }
  getLocalRefreshToken() {
    const refresh_token = localStorage.getItem("refresh_token");
    return refresh_token;
  }

  sign() {
    const privateKey = process.env.VUE_APP_CLIENT_SECRET;
    const privateKeyWithHeader = '-----BEGIN RSA PRIVATE KEY-----\n' + privateKey + '\n-----END RSA PRIVATE KEY-----\n'
    // Create some sample data that we want to sign
    const verifiableData = this.getLocalRefreshToken()
    console.log("Refresh" + verifiableData)
    // The signature method takes the data we want to sign, the
    // hashing algorithm, and the padding scheme, and generates
    // a signature in the form of bytes
    let sig = new rs.KJUR.crypto.Signature({ alg: 'SHA256withRSA' })
    sig.init(rs.KEYUTIL.getKey(privateKeyWithHeader))
    sig.updateString(verifiableData)
    var signatureBase64 =rs.hextob64(sig.sign())
    // const signature = crypto.sign("sha256", Buffer.from(verifiableData), {
    //   key: privateKey,
    //   padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
    // });
    // console.log(signature.toString("base64"));
    return signatureBase64
  }

  updateLocalAccessToken(token) {
    localStorage.setItem("access_token", token);
  }

  updateLocalRefreshToken(token) {
    localStorage.setItem("refresh_token", token);
  }

  getUser() {
    return localStorage.getItem("user_info");
  }

  setUser(user) {
    localStorage.setItem("user_info", JSON.stringify(user));
  }

  removeUser() {
    localStorage.removeItem("user_info");
  }

  readKey() {

  }
}

export default new TokenService();