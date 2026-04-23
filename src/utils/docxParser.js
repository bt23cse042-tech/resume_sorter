import mammoth from 'mammoth'

/**
 * Extract text from a DOCX file (client-side)
 * @param {File} file - DOCX file object
 * @returns {Promise<string>} Extracted text
 */
export async function extractTextFromDOCX(file) {
  try {
    const arrayBuffer = await file.arrayBuffer()
    const result = await mammoth.extractRawText({ arrayBuffer })
    const text = result.value.trim()

    if (!text) {
      throw new Error('No text content found in the DOCX file.')
    }

    return text
  } catch (error) {
    if (error.message.includes('No text content')) {
      throw error
    }
    throw new Error('Failed to parse DOCX. The file may be corrupted or in an unsupported format.')
  }
}
