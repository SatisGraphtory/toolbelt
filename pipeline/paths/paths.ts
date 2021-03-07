import * as path from 'path';

export const engineeringRoot = path.resolve(__dirname, '..', '..');

export namespace sourceData {
  export const root = path.join(engineeringRoot, '.SourceData');
  export const headers = path.join(root, 'Headers');
  export const docs = path.join(root, 'Docs');
}

export namespace dataLanding {
  export const root = path.join(engineeringRoot, '.DataLanding');
  // export const data = path.join(root, 'data');
  export const interfaces = path.join(root, 'interfaces');
  export const json = path.join(root, 'json');
  export const objects = path.join(root, 'objects');
}

export namespace dataWarehouse {
  // export const root = path.join(engineeringRoot, '.data-warehouse');
}
