/* eslint-disable @typescript-eslint/no-unnecessary-type-parameters */
type Prettify<T> = {
  [K in keyof T]: T[K]
} & {}

type Equal<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2
    ? true
    : false
