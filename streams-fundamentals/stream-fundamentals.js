// Duplex: Stream de Leitura e escritura. Um junção entre (Readable e Writable). Obs: Muito pouco utilizada.
import { Readable, Writable, Transform, Duplex } from 'node:stream'

class OneToHundredStream extends Readable {
  index = 1;

  _read() {
    const i = this.index++

    setTimeout(() => {
      if (i > 100) {
        this.push(null)
      } else {
        const buf = Buffer.from(String(i))
  
        this.push(buf) // chunk
      }
    }, 1000)
  }
}

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1

    // erro response: Primeiro parâmetro de um callback é o retorno de erro caso exista se não é `null`
    // Buffer é uma forma de encaminhar dados entre streams (modelo Node de dados)
    callback(null, Buffer.from(String(transformed)))
  }
}

class MultiplyByTenStream extends Writable {
  // stream de escrita apenas processa o dado
  // chuck: O pedaço que agente leu da stream de leitura
  // encoding: É como essa informação está codificada
  // callback: É uma função que a escrita tem que chamar quando ela terminou de fazer o que precisa com aquela informação
  _write(chunk, encoding, callback) {
    console.log(Number(chunk.toString()) * 10);
    callback()
  }
}

new OneToHundredStream()
  .pipe(new InverseNumberStream())
  .pipe(new MultiplyByTenStream())

