/**
 * Removes any leftover comments during build
 * 
 * @returns 
 */
export default function striptease() {
  return {
    name: 'striptease',
    renderChunk(code) {
      return {
        apply: 'build',
        enforce: 'post',
        code: code.replace(/\/\*[^\0]*?\*\//gi, "").trim(),
        map: null // provide source map if available
      }
    }
  }
}