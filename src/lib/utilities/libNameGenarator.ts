const libPrefix: string = 'wab'

export function generateLibName (libName: string): string {
  return ['', libPrefix, libName].join('_')
}
