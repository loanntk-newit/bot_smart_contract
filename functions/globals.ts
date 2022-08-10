import _format from 'date-fns/format'
import _parseISO from 'date-fns/parseISO'

export function formatDate(date: string, format: string = 'yyyy-MM-dd') {
  return _format(_parseISO(date), format)
}
