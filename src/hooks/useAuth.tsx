// The API expects a 64 byte key (128 hex digits long):
const url= import.meta.env.VITE_API_URL;
const APIkey= import.meta.env.VITE_API_KEY;
const KEY_SIZE_BYTES = 64;
// The API expects a 16 byte salt (32 hex digits long):
const SALT_SIZE_BYTES = 16;
// A function that converts a ByteArray or any other array of bytes into a
// string of hexadecimal digits
const convertBufferToHex = (buffer: Uint8Array| ArrayBuffer) => {
  return (
    // This next line ensures we're dealing with an actual array
    [...new Uint8Array(buffer)]
      // Keep in mind that:
      // 1 byte = 8 bits
      // 1 hex digit = 4 bits
      // 1 byte = 2 hex digits
      // So, convert each 1 byte into 2 hexadecimal digits
      .map((byte) => byte.toString(16).padStart(2, '0'))
      // Concatenate it all together into one big string
      .join('')
  );
};

// A function that converts a string of hexadecimal digits into an array of
// bytes (you should verify that the string is hex first!)
const convertHexToBuffer = (hexString: string) => {
  return Uint8Array.from(
    // Keep in mind that:
    // 1 byte = 8 bits
    // 1 hex digit = 4 bits
    // 1 byte = 2 hex digits
    // So, convert every pair of hexadecimal digits into 1 byte
    hexString.match(/[0-9a-f]{1,2}/gi).map((byte) => parseInt(byte, 16))
  );
};

// Turns a password (string) and salt (buffer) into a key and salt (hex strings)
const deriveKeyFromPassword = async (passwordString: string, saltBuffer: Uint8Array) => {
  // We'll use a TextEncoder to convert strings into arrays of bytes:
  const textEncoder = new TextEncoder('utf-8');

  // Convert the password string into an array of bytes:
  const passwordBuffer = textEncoder.encode(passwordString);

  // Use WebCrypto to generate an array of 16 random bytes if one isn't passed
  // in:
  saltBuffer =
    saltBuffer ||
    window.crypto.getRandomValues(new Uint8Array(SALT_SIZE_BYTES));

  // Convert our passwordBuffer into something WebCrypto understands:
  const plaintextKey = await window.crypto.subtle.importKey(
    'raw', // We're working with a "raw" array of bytes
    passwordBuffer, // Pass in our (converted) password byte array
    'PBKDF2', // Tell WebCrypto our byte array doesn't contain anything fancy
    false, // We don't want anyone to extract the original password!
    ['deriveBits'] // We're gonna use this method to derive a key (below)
  );

  // Run the WebCrypto-compatible password through the PBKDF2 algorithm:
  const pbkdf2Buffer = await window.crypto.subtle.deriveBits(
    {
      // We want to use PBKDF#2 to "hash" our user's password
      name: 'PBKDF2',
      // Let's use that array of 16 random bytes we made earlier
      salt: saltBuffer,
      // Higher the number, the longer it takes, but the more secure it is!
      // 100,000 is pretty good. More than 500,000 might be slow on mobile.
      //
      // NOTICE: all teams should use 100,000 iterations for PBKDF2 to make cross-app
      // logins easier for the judges!
      iterations: 100000,
      // This should look familiar...
      hash: 'SHA-256'
    },
    // Pass in the user's password (which has been converted)
    plaintextKey,
    // Let's derive a 128 byte key. Since we're using a function called
    // deriveBITS, and 8 BITS = 1 byte, and we want 128 bytes, we need this
    // function to spit out 128 * 8 bits!
    KEY_SIZE_BYTES * 8
  );

  // At this point, derivedKey contains an array of 128 bytes. We got
  // these bytes by running the user's password + a salt (16 random
  // characters) through the PBKDF#2 function. All that's left to do is
  // convert our byte arrays into (hex) strings and send them to the API.

  // Since the API expects the salt and the key to be in hexadecimal,
  // we'll need to turn our byte arrays into hex strings:
  const saltString = convertBufferToHex(saltBuffer);
  const keyString = convertBufferToHex(pbkdf2Buffer);

  // Return the key and salt as hexadecimal strings
  return { keyString, saltString };
};
async function getSalt(username: string){
    const options={
        headers: {
            "Authorization":APIkey,
            'content-type': 'application/json'
        }
    }
    const res= await fetch(`${url}users/${username}`, options);
    const data= await res.json();
    return [data.user.salt, data.user];
}
async function getAuth(key: string, username: string){
    const options={
        method:'POST',
        body:JSON.stringify({
            key:key,
        }),
        headers: {
            "Authorization":APIkey,
            'content-type': 'application/json'
        }
    };
    const res= await fetch(`${url}users/${username}/auth`, options)
    const data= await res.json();
    return data;
}
export default async function useAuth(password :string, username: string){
   const [salt, user]= await getSalt(username);
   const key= await deriveKeyFromPassword(password,convertHexToBuffer(salt));
   const res= await getAuth(key.keyString, username);
   console.log(res)
return [res.success, user];
}