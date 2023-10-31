import http from 'node:http'
import { Transform } from 'node:stream'


class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1

    console.log(transformed)

    // erro response: Primeiro parâmetro de um callback é o retorno de erro caso exista se não é `null`
    // Buffer é uma forma de encaminhar dados entre streams (modelo Node de dados)
    callback(null, Buffer.from(String(transformed)))
  }
}

// req => Readable Stream
// res -> Writable Stream

const server = http.createServer((req, res) => {
  return req
    .pipe(new InverseNumberStream())
    .pipe(res)
})

server.listen(3334)