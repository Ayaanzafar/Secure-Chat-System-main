
function encryptDecrypt (inpString) {
  inpString = inpString.split('')
  let xorKey = 'P'
  let len = inpString.length
  for (let i = 0; i < len; i++) {
    inpString[i] = (String.fromCharCode((inpString[i].charCodeAt(0)) ^ xorKey.charCodeAt(0)));
    process.stdout.write(inpString[i]);
  }
  return inpString.join('')
}
let sampleString = 'GeeksforGeeks'
process.stdout.write('Encrypted String: ')
sampleString = encryptDecrypt(sampleString)
process.stdout.write('\n')
process.stdout.write('Decrypted String: ')
encryptDecrypt(sampleString)

// // function encrypt (message, shift) {
// //   const listLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '`', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '+', '~', '=', '_', '{', '}', '[', ']', '|', ':', '"', ';', '<', '>', ',', '.', '/', '?'];
// //   var cipher = "";
// //   var i=0, j=0, k=0, num=0;
// //   for (i = 0; i < message.length; i++)
// //   {
// //     const x = message.charAt(i);
// //     if (x !== ' ')
// //     {
// //       for (j = 0; j < listLetters.length; j++)
// //       {
// //           if (listLetters[j] === x)
// //         {
// //           k = j;
// //         }
// //       }
// //       num = (k + shift) % 26;
// //       cipher += listLetters[num];
// //     }
// //     else {
// //         cipher += " ";
// //     }
// //   }
// //   return cipher;
// // }

// // function decrypt(message, shift) {
// //   const listLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
// //   var cipher = "";
// //   var i=0, j=0, k=0, num=0;
// //   for (i = 0; i < message.length; i++)
// //   {
// //     const x = message.charAt(i);
// //     if (x !== ' ')
// //     {
// //       for (j = 0; j < listLetters.length; j++)
// //       {
// //         if (listLetters[j] === x)
// //         {
// //           k = j;
// //         }
// //       }
// //       num = (k - shift + 26) % 26;
// //       cipher += listLetters[num];
// //     }
// //     else {
// //       cipher += " ";
// //     }
// //   }
// //   return cipher;
// // }

// // module.exports = encrypt;
// // module.exports = decrypt;
// const crypto = require('crypto')

// var secret_key = 'fd85b494-aaaa'
// var secret_iv = 'smslt'
// var encryptionMethod = 'AES-256-CBC'
// var key = crypto.createHash('sha512').update(secret_key, 'utf-8').digest('hex').substring(0, 32)
// var iv = crypto.createHash('sha512').update(secret_key, 'utf-8').digest('hex').substring(0, 16)

// function encrypt (plain_text, encryptionMethod, secret, iv) {
//   var encryptor = crypto.createCipheriv(encryptionMethod, secret, iv)
//   var aes_encrypted = encryptor.update(plain_text, 'utf-8', 'base64') + encryptor.final('base64')
//   return Buffer.from(aes_encrypted).toString('base64')
// }

// // function decrypt (encrypted_Message, encryptionMethod, secret, iv) {
// //   const buff = Buffer.from(encrypted_Message, 'base64')
// //   encrypted_Message = buff.toString('utf-8')
// //   var decryptor = crypto.createDecipheriv(encryptionMethod, secret, iv)
// //   return decryptor.update(encrypted_Message, 'base64', 'utf-8') + decryptor.final('utf-8')
// // }
// module.exports = encrypt
// // module.exports = decrypt
// // function encrypt (_key, text) {
// //   try {
// //     text = text.toString()
// //     const key = Buffer.from(_key, 'utf-8')
// //     const plaintext = Buffer.from(text, 'utf8')
// //     const cipher = crypto.createCipheriv('AES-256-ECB', key, Buffer.from([]))
// //     console.log('yes')
// //     let ciphertext = Buffer.concat([cipher.update(plaintext), cipher.final()])
// //     ciphertext = ciphertext.toString('base64')
// //     return ({ status: 1, data: ciphertext })
// //   } catch (e) {
// //     return ({ status: 0, data: 'error' })
// //   }
// // }

// // function decrypt (_key, text) {
// //   try {
// //     const key = Buffer.from(_key, 'utf-8')
// //     const decipher = crypto.createDecipheriv('AES-256-ECB', key, Buffer.from([]))
// //     let clearText = decipher.update(text, 'base64', 'info')
// //     clearText = decipher.final('utf-8')
// //     return ({ status: 1, deta: clearText })
// //   } catch (e) {
// //     return ({ status: 0, data: 'error' })
// //   }
// // }
// // let a = (encrypt('7d7c2a9c534365892e', 5))
// // const b = decrypt('7d7c052ac3055430094305092attle', a.data)

// // console.log(a)
// // console.log(b)
