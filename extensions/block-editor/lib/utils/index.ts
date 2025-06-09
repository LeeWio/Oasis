export function randomElement<T>(array: Array<T>): T {
  return array[Math.floor(Math.random() * array.length)];
}

// export * from './cssVar'
// export * from './getConnectionText'
// export * from './getRenderContainer'
export * from "./is-custom-node-selected";
export * from "./is-text-selected";
