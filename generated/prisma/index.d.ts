
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Saude
 * 
 */
export type Saude = $Result.DefaultSelection<Prisma.$SaudePayload>
/**
 * Model CulturaLazer
 * 
 */
export type CulturaLazer = $Result.DefaultSelection<Prisma.$CulturaLazerPayload>
/**
 * Model Educacao
 * 
 */
export type Educacao = $Result.DefaultSelection<Prisma.$EducacaoPayload>
/**
 * Model Urgencia
 * 
 */
export type Urgencia = $Result.DefaultSelection<Prisma.$UrgenciaPayload>
/**
 * Model Direitos
 * 
 */
export type Direitos = $Result.DefaultSelection<Prisma.$DireitosPayload>
/**
 * Model OrgaoPublico
 * 
 */
export type OrgaoPublico = $Result.DefaultSelection<Prisma.$OrgaoPublicoPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Saudes
 * const saudes = await prisma.saude.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Saudes
   * const saudes = await prisma.saude.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P]): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number }): $Utils.JsPromise<R>

  /**
   * Executes a raw MongoDB command and returns the result of it.
   * @example
   * ```
   * const user = await prisma.$runCommandRaw({
   *   aggregate: 'User',
   *   pipeline: [{ $match: { name: 'Bob' } }, { $project: { email: true, _id: false } }],
   *   explain: false,
   * })
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $runCommandRaw(command: Prisma.InputJsonObject): Prisma.PrismaPromise<Prisma.JsonObject>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.saude`: Exposes CRUD operations for the **Saude** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Saudes
    * const saudes = await prisma.saude.findMany()
    * ```
    */
  get saude(): Prisma.SaudeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.culturaLazer`: Exposes CRUD operations for the **CulturaLazer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CulturaLazers
    * const culturaLazers = await prisma.culturaLazer.findMany()
    * ```
    */
  get culturaLazer(): Prisma.CulturaLazerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.educacao`: Exposes CRUD operations for the **Educacao** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Educacaos
    * const educacaos = await prisma.educacao.findMany()
    * ```
    */
  get educacao(): Prisma.EducacaoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.urgencia`: Exposes CRUD operations for the **Urgencia** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Urgencias
    * const urgencias = await prisma.urgencia.findMany()
    * ```
    */
  get urgencia(): Prisma.UrgenciaDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.direitos`: Exposes CRUD operations for the **Direitos** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Direitos
    * const direitos = await prisma.direitos.findMany()
    * ```
    */
  get direitos(): Prisma.DireitosDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.orgaoPublico`: Exposes CRUD operations for the **OrgaoPublico** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OrgaoPublicos
    * const orgaoPublicos = await prisma.orgaoPublico.findMany()
    * ```
    */
  get orgaoPublico(): Prisma.OrgaoPublicoDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.7.0
   * Query Engine version: 3cff47a7f5d65c3ea74883f1d736e41d68ce91ed
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Saude: 'Saude',
    CulturaLazer: 'CulturaLazer',
    Educacao: 'Educacao',
    Urgencia: 'Urgencia',
    Direitos: 'Direitos',
    OrgaoPublico: 'OrgaoPublico'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "saude" | "culturaLazer" | "educacao" | "urgencia" | "direitos" | "orgaoPublico"
      txIsolationLevel: never
    }
    model: {
      Saude: {
        payload: Prisma.$SaudePayload<ExtArgs>
        fields: Prisma.SaudeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SaudeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SaudePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SaudeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SaudePayload>
          }
          findFirst: {
            args: Prisma.SaudeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SaudePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SaudeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SaudePayload>
          }
          findMany: {
            args: Prisma.SaudeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SaudePayload>[]
          }
          create: {
            args: Prisma.SaudeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SaudePayload>
          }
          createMany: {
            args: Prisma.SaudeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.SaudeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SaudePayload>
          }
          update: {
            args: Prisma.SaudeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SaudePayload>
          }
          deleteMany: {
            args: Prisma.SaudeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SaudeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SaudeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SaudePayload>
          }
          aggregate: {
            args: Prisma.SaudeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSaude>
          }
          groupBy: {
            args: Prisma.SaudeGroupByArgs<ExtArgs>
            result: $Utils.Optional<SaudeGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.SaudeFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.SaudeAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.SaudeCountArgs<ExtArgs>
            result: $Utils.Optional<SaudeCountAggregateOutputType> | number
          }
        }
      }
      CulturaLazer: {
        payload: Prisma.$CulturaLazerPayload<ExtArgs>
        fields: Prisma.CulturaLazerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CulturaLazerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CulturaLazerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CulturaLazerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CulturaLazerPayload>
          }
          findFirst: {
            args: Prisma.CulturaLazerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CulturaLazerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CulturaLazerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CulturaLazerPayload>
          }
          findMany: {
            args: Prisma.CulturaLazerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CulturaLazerPayload>[]
          }
          create: {
            args: Prisma.CulturaLazerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CulturaLazerPayload>
          }
          createMany: {
            args: Prisma.CulturaLazerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.CulturaLazerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CulturaLazerPayload>
          }
          update: {
            args: Prisma.CulturaLazerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CulturaLazerPayload>
          }
          deleteMany: {
            args: Prisma.CulturaLazerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CulturaLazerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CulturaLazerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CulturaLazerPayload>
          }
          aggregate: {
            args: Prisma.CulturaLazerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCulturaLazer>
          }
          groupBy: {
            args: Prisma.CulturaLazerGroupByArgs<ExtArgs>
            result: $Utils.Optional<CulturaLazerGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.CulturaLazerFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.CulturaLazerAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.CulturaLazerCountArgs<ExtArgs>
            result: $Utils.Optional<CulturaLazerCountAggregateOutputType> | number
          }
        }
      }
      Educacao: {
        payload: Prisma.$EducacaoPayload<ExtArgs>
        fields: Prisma.EducacaoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EducacaoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EducacaoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EducacaoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EducacaoPayload>
          }
          findFirst: {
            args: Prisma.EducacaoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EducacaoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EducacaoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EducacaoPayload>
          }
          findMany: {
            args: Prisma.EducacaoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EducacaoPayload>[]
          }
          create: {
            args: Prisma.EducacaoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EducacaoPayload>
          }
          createMany: {
            args: Prisma.EducacaoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.EducacaoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EducacaoPayload>
          }
          update: {
            args: Prisma.EducacaoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EducacaoPayload>
          }
          deleteMany: {
            args: Prisma.EducacaoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EducacaoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.EducacaoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EducacaoPayload>
          }
          aggregate: {
            args: Prisma.EducacaoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEducacao>
          }
          groupBy: {
            args: Prisma.EducacaoGroupByArgs<ExtArgs>
            result: $Utils.Optional<EducacaoGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.EducacaoFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.EducacaoAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.EducacaoCountArgs<ExtArgs>
            result: $Utils.Optional<EducacaoCountAggregateOutputType> | number
          }
        }
      }
      Urgencia: {
        payload: Prisma.$UrgenciaPayload<ExtArgs>
        fields: Prisma.UrgenciaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UrgenciaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UrgenciaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UrgenciaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UrgenciaPayload>
          }
          findFirst: {
            args: Prisma.UrgenciaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UrgenciaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UrgenciaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UrgenciaPayload>
          }
          findMany: {
            args: Prisma.UrgenciaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UrgenciaPayload>[]
          }
          create: {
            args: Prisma.UrgenciaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UrgenciaPayload>
          }
          createMany: {
            args: Prisma.UrgenciaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.UrgenciaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UrgenciaPayload>
          }
          update: {
            args: Prisma.UrgenciaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UrgenciaPayload>
          }
          deleteMany: {
            args: Prisma.UrgenciaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UrgenciaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UrgenciaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UrgenciaPayload>
          }
          aggregate: {
            args: Prisma.UrgenciaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUrgencia>
          }
          groupBy: {
            args: Prisma.UrgenciaGroupByArgs<ExtArgs>
            result: $Utils.Optional<UrgenciaGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.UrgenciaFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.UrgenciaAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.UrgenciaCountArgs<ExtArgs>
            result: $Utils.Optional<UrgenciaCountAggregateOutputType> | number
          }
        }
      }
      Direitos: {
        payload: Prisma.$DireitosPayload<ExtArgs>
        fields: Prisma.DireitosFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DireitosFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DireitosPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DireitosFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DireitosPayload>
          }
          findFirst: {
            args: Prisma.DireitosFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DireitosPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DireitosFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DireitosPayload>
          }
          findMany: {
            args: Prisma.DireitosFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DireitosPayload>[]
          }
          create: {
            args: Prisma.DireitosCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DireitosPayload>
          }
          createMany: {
            args: Prisma.DireitosCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.DireitosDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DireitosPayload>
          }
          update: {
            args: Prisma.DireitosUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DireitosPayload>
          }
          deleteMany: {
            args: Prisma.DireitosDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DireitosUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.DireitosUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DireitosPayload>
          }
          aggregate: {
            args: Prisma.DireitosAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDireitos>
          }
          groupBy: {
            args: Prisma.DireitosGroupByArgs<ExtArgs>
            result: $Utils.Optional<DireitosGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.DireitosFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.DireitosAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.DireitosCountArgs<ExtArgs>
            result: $Utils.Optional<DireitosCountAggregateOutputType> | number
          }
        }
      }
      OrgaoPublico: {
        payload: Prisma.$OrgaoPublicoPayload<ExtArgs>
        fields: Prisma.OrgaoPublicoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrgaoPublicoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrgaoPublicoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrgaoPublicoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrgaoPublicoPayload>
          }
          findFirst: {
            args: Prisma.OrgaoPublicoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrgaoPublicoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrgaoPublicoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrgaoPublicoPayload>
          }
          findMany: {
            args: Prisma.OrgaoPublicoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrgaoPublicoPayload>[]
          }
          create: {
            args: Prisma.OrgaoPublicoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrgaoPublicoPayload>
          }
          createMany: {
            args: Prisma.OrgaoPublicoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.OrgaoPublicoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrgaoPublicoPayload>
          }
          update: {
            args: Prisma.OrgaoPublicoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrgaoPublicoPayload>
          }
          deleteMany: {
            args: Prisma.OrgaoPublicoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OrgaoPublicoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.OrgaoPublicoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrgaoPublicoPayload>
          }
          aggregate: {
            args: Prisma.OrgaoPublicoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrgaoPublico>
          }
          groupBy: {
            args: Prisma.OrgaoPublicoGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrgaoPublicoGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.OrgaoPublicoFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.OrgaoPublicoAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.OrgaoPublicoCountArgs<ExtArgs>
            result: $Utils.Optional<OrgaoPublicoCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $runCommandRaw: {
          args: Prisma.InputJsonObject,
          result: Prisma.JsonObject
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    saude?: SaudeOmit
    culturaLazer?: CulturaLazerOmit
    educacao?: EducacaoOmit
    urgencia?: UrgenciaOmit
    direitos?: DireitosOmit
    orgaoPublico?: OrgaoPublicoOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model Saude
   */

  export type AggregateSaude = {
    _count: SaudeCountAggregateOutputType | null
    _min: SaudeMinAggregateOutputType | null
    _max: SaudeMaxAggregateOutputType | null
  }

  export type SaudeMinAggregateOutputType = {
    id: string | null
    nomeServico: string | null
    descricao: string | null
    orgaoResponsavel: string | null
    contato: string | null
    localizacao: string | null
    horarios: string | null
  }

  export type SaudeMaxAggregateOutputType = {
    id: string | null
    nomeServico: string | null
    descricao: string | null
    orgaoResponsavel: string | null
    contato: string | null
    localizacao: string | null
    horarios: string | null
  }

  export type SaudeCountAggregateOutputType = {
    id: number
    nomeServico: number
    descricao: number
    orgaoResponsavel: number
    contato: number
    localizacao: number
    horarios: number
    _all: number
  }


  export type SaudeMinAggregateInputType = {
    id?: true
    nomeServico?: true
    descricao?: true
    orgaoResponsavel?: true
    contato?: true
    localizacao?: true
    horarios?: true
  }

  export type SaudeMaxAggregateInputType = {
    id?: true
    nomeServico?: true
    descricao?: true
    orgaoResponsavel?: true
    contato?: true
    localizacao?: true
    horarios?: true
  }

  export type SaudeCountAggregateInputType = {
    id?: true
    nomeServico?: true
    descricao?: true
    orgaoResponsavel?: true
    contato?: true
    localizacao?: true
    horarios?: true
    _all?: true
  }

  export type SaudeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Saude to aggregate.
     */
    where?: SaudeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Saudes to fetch.
     */
    orderBy?: SaudeOrderByWithRelationInput | SaudeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SaudeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Saudes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Saudes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Saudes
    **/
    _count?: true | SaudeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SaudeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SaudeMaxAggregateInputType
  }

  export type GetSaudeAggregateType<T extends SaudeAggregateArgs> = {
        [P in keyof T & keyof AggregateSaude]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSaude[P]>
      : GetScalarType<T[P], AggregateSaude[P]>
  }




  export type SaudeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SaudeWhereInput
    orderBy?: SaudeOrderByWithAggregationInput | SaudeOrderByWithAggregationInput[]
    by: SaudeScalarFieldEnum[] | SaudeScalarFieldEnum
    having?: SaudeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SaudeCountAggregateInputType | true
    _min?: SaudeMinAggregateInputType
    _max?: SaudeMaxAggregateInputType
  }

  export type SaudeGroupByOutputType = {
    id: string
    nomeServico: string
    descricao: string
    orgaoResponsavel: string
    contato: string | null
    localizacao: string | null
    horarios: string | null
    _count: SaudeCountAggregateOutputType | null
    _min: SaudeMinAggregateOutputType | null
    _max: SaudeMaxAggregateOutputType | null
  }

  type GetSaudeGroupByPayload<T extends SaudeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SaudeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SaudeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SaudeGroupByOutputType[P]>
            : GetScalarType<T[P], SaudeGroupByOutputType[P]>
        }
      >
    >


  export type SaudeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nomeServico?: boolean
    descricao?: boolean
    orgaoResponsavel?: boolean
    contato?: boolean
    localizacao?: boolean
    horarios?: boolean
  }, ExtArgs["result"]["saude"]>



  export type SaudeSelectScalar = {
    id?: boolean
    nomeServico?: boolean
    descricao?: boolean
    orgaoResponsavel?: boolean
    contato?: boolean
    localizacao?: boolean
    horarios?: boolean
  }

  export type SaudeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nomeServico" | "descricao" | "orgaoResponsavel" | "contato" | "localizacao" | "horarios", ExtArgs["result"]["saude"]>

  export type $SaudePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Saude"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nomeServico: string
      descricao: string
      orgaoResponsavel: string
      contato: string | null
      localizacao: string | null
      horarios: string | null
    }, ExtArgs["result"]["saude"]>
    composites: {}
  }

  type SaudeGetPayload<S extends boolean | null | undefined | SaudeDefaultArgs> = $Result.GetResult<Prisma.$SaudePayload, S>

  type SaudeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SaudeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SaudeCountAggregateInputType | true
    }

  export interface SaudeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Saude'], meta: { name: 'Saude' } }
    /**
     * Find zero or one Saude that matches the filter.
     * @param {SaudeFindUniqueArgs} args - Arguments to find a Saude
     * @example
     * // Get one Saude
     * const saude = await prisma.saude.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SaudeFindUniqueArgs>(args: SelectSubset<T, SaudeFindUniqueArgs<ExtArgs>>): Prisma__SaudeClient<$Result.GetResult<Prisma.$SaudePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Saude that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SaudeFindUniqueOrThrowArgs} args - Arguments to find a Saude
     * @example
     * // Get one Saude
     * const saude = await prisma.saude.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SaudeFindUniqueOrThrowArgs>(args: SelectSubset<T, SaudeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SaudeClient<$Result.GetResult<Prisma.$SaudePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Saude that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SaudeFindFirstArgs} args - Arguments to find a Saude
     * @example
     * // Get one Saude
     * const saude = await prisma.saude.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SaudeFindFirstArgs>(args?: SelectSubset<T, SaudeFindFirstArgs<ExtArgs>>): Prisma__SaudeClient<$Result.GetResult<Prisma.$SaudePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Saude that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SaudeFindFirstOrThrowArgs} args - Arguments to find a Saude
     * @example
     * // Get one Saude
     * const saude = await prisma.saude.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SaudeFindFirstOrThrowArgs>(args?: SelectSubset<T, SaudeFindFirstOrThrowArgs<ExtArgs>>): Prisma__SaudeClient<$Result.GetResult<Prisma.$SaudePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Saudes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SaudeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Saudes
     * const saudes = await prisma.saude.findMany()
     * 
     * // Get first 10 Saudes
     * const saudes = await prisma.saude.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const saudeWithIdOnly = await prisma.saude.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SaudeFindManyArgs>(args?: SelectSubset<T, SaudeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SaudePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Saude.
     * @param {SaudeCreateArgs} args - Arguments to create a Saude.
     * @example
     * // Create one Saude
     * const Saude = await prisma.saude.create({
     *   data: {
     *     // ... data to create a Saude
     *   }
     * })
     * 
     */
    create<T extends SaudeCreateArgs>(args: SelectSubset<T, SaudeCreateArgs<ExtArgs>>): Prisma__SaudeClient<$Result.GetResult<Prisma.$SaudePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Saudes.
     * @param {SaudeCreateManyArgs} args - Arguments to create many Saudes.
     * @example
     * // Create many Saudes
     * const saude = await prisma.saude.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SaudeCreateManyArgs>(args?: SelectSubset<T, SaudeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Saude.
     * @param {SaudeDeleteArgs} args - Arguments to delete one Saude.
     * @example
     * // Delete one Saude
     * const Saude = await prisma.saude.delete({
     *   where: {
     *     // ... filter to delete one Saude
     *   }
     * })
     * 
     */
    delete<T extends SaudeDeleteArgs>(args: SelectSubset<T, SaudeDeleteArgs<ExtArgs>>): Prisma__SaudeClient<$Result.GetResult<Prisma.$SaudePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Saude.
     * @param {SaudeUpdateArgs} args - Arguments to update one Saude.
     * @example
     * // Update one Saude
     * const saude = await prisma.saude.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SaudeUpdateArgs>(args: SelectSubset<T, SaudeUpdateArgs<ExtArgs>>): Prisma__SaudeClient<$Result.GetResult<Prisma.$SaudePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Saudes.
     * @param {SaudeDeleteManyArgs} args - Arguments to filter Saudes to delete.
     * @example
     * // Delete a few Saudes
     * const { count } = await prisma.saude.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SaudeDeleteManyArgs>(args?: SelectSubset<T, SaudeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Saudes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SaudeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Saudes
     * const saude = await prisma.saude.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SaudeUpdateManyArgs>(args: SelectSubset<T, SaudeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Saude.
     * @param {SaudeUpsertArgs} args - Arguments to update or create a Saude.
     * @example
     * // Update or create a Saude
     * const saude = await prisma.saude.upsert({
     *   create: {
     *     // ... data to create a Saude
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Saude we want to update
     *   }
     * })
     */
    upsert<T extends SaudeUpsertArgs>(args: SelectSubset<T, SaudeUpsertArgs<ExtArgs>>): Prisma__SaudeClient<$Result.GetResult<Prisma.$SaudePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Saudes that matches the filter.
     * @param {SaudeFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const saude = await prisma.saude.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: SaudeFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Saude.
     * @param {SaudeAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const saude = await prisma.saude.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: SaudeAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Saudes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SaudeCountArgs} args - Arguments to filter Saudes to count.
     * @example
     * // Count the number of Saudes
     * const count = await prisma.saude.count({
     *   where: {
     *     // ... the filter for the Saudes we want to count
     *   }
     * })
    **/
    count<T extends SaudeCountArgs>(
      args?: Subset<T, SaudeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SaudeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Saude.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SaudeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SaudeAggregateArgs>(args: Subset<T, SaudeAggregateArgs>): Prisma.PrismaPromise<GetSaudeAggregateType<T>>

    /**
     * Group by Saude.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SaudeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SaudeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SaudeGroupByArgs['orderBy'] }
        : { orderBy?: SaudeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SaudeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSaudeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Saude model
   */
  readonly fields: SaudeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Saude.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SaudeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Saude model
   */
  interface SaudeFieldRefs {
    readonly id: FieldRef<"Saude", 'String'>
    readonly nomeServico: FieldRef<"Saude", 'String'>
    readonly descricao: FieldRef<"Saude", 'String'>
    readonly orgaoResponsavel: FieldRef<"Saude", 'String'>
    readonly contato: FieldRef<"Saude", 'String'>
    readonly localizacao: FieldRef<"Saude", 'String'>
    readonly horarios: FieldRef<"Saude", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Saude findUnique
   */
  export type SaudeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Saude
     */
    select?: SaudeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Saude
     */
    omit?: SaudeOmit<ExtArgs> | null
    /**
     * Filter, which Saude to fetch.
     */
    where: SaudeWhereUniqueInput
  }

  /**
   * Saude findUniqueOrThrow
   */
  export type SaudeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Saude
     */
    select?: SaudeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Saude
     */
    omit?: SaudeOmit<ExtArgs> | null
    /**
     * Filter, which Saude to fetch.
     */
    where: SaudeWhereUniqueInput
  }

  /**
   * Saude findFirst
   */
  export type SaudeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Saude
     */
    select?: SaudeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Saude
     */
    omit?: SaudeOmit<ExtArgs> | null
    /**
     * Filter, which Saude to fetch.
     */
    where?: SaudeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Saudes to fetch.
     */
    orderBy?: SaudeOrderByWithRelationInput | SaudeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Saudes.
     */
    cursor?: SaudeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Saudes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Saudes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Saudes.
     */
    distinct?: SaudeScalarFieldEnum | SaudeScalarFieldEnum[]
  }

  /**
   * Saude findFirstOrThrow
   */
  export type SaudeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Saude
     */
    select?: SaudeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Saude
     */
    omit?: SaudeOmit<ExtArgs> | null
    /**
     * Filter, which Saude to fetch.
     */
    where?: SaudeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Saudes to fetch.
     */
    orderBy?: SaudeOrderByWithRelationInput | SaudeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Saudes.
     */
    cursor?: SaudeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Saudes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Saudes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Saudes.
     */
    distinct?: SaudeScalarFieldEnum | SaudeScalarFieldEnum[]
  }

  /**
   * Saude findMany
   */
  export type SaudeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Saude
     */
    select?: SaudeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Saude
     */
    omit?: SaudeOmit<ExtArgs> | null
    /**
     * Filter, which Saudes to fetch.
     */
    where?: SaudeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Saudes to fetch.
     */
    orderBy?: SaudeOrderByWithRelationInput | SaudeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Saudes.
     */
    cursor?: SaudeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Saudes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Saudes.
     */
    skip?: number
    distinct?: SaudeScalarFieldEnum | SaudeScalarFieldEnum[]
  }

  /**
   * Saude create
   */
  export type SaudeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Saude
     */
    select?: SaudeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Saude
     */
    omit?: SaudeOmit<ExtArgs> | null
    /**
     * The data needed to create a Saude.
     */
    data: XOR<SaudeCreateInput, SaudeUncheckedCreateInput>
  }

  /**
   * Saude createMany
   */
  export type SaudeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Saudes.
     */
    data: SaudeCreateManyInput | SaudeCreateManyInput[]
  }

  /**
   * Saude update
   */
  export type SaudeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Saude
     */
    select?: SaudeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Saude
     */
    omit?: SaudeOmit<ExtArgs> | null
    /**
     * The data needed to update a Saude.
     */
    data: XOR<SaudeUpdateInput, SaudeUncheckedUpdateInput>
    /**
     * Choose, which Saude to update.
     */
    where: SaudeWhereUniqueInput
  }

  /**
   * Saude updateMany
   */
  export type SaudeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Saudes.
     */
    data: XOR<SaudeUpdateManyMutationInput, SaudeUncheckedUpdateManyInput>
    /**
     * Filter which Saudes to update
     */
    where?: SaudeWhereInput
    /**
     * Limit how many Saudes to update.
     */
    limit?: number
  }

  /**
   * Saude upsert
   */
  export type SaudeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Saude
     */
    select?: SaudeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Saude
     */
    omit?: SaudeOmit<ExtArgs> | null
    /**
     * The filter to search for the Saude to update in case it exists.
     */
    where: SaudeWhereUniqueInput
    /**
     * In case the Saude found by the `where` argument doesn't exist, create a new Saude with this data.
     */
    create: XOR<SaudeCreateInput, SaudeUncheckedCreateInput>
    /**
     * In case the Saude was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SaudeUpdateInput, SaudeUncheckedUpdateInput>
  }

  /**
   * Saude delete
   */
  export type SaudeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Saude
     */
    select?: SaudeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Saude
     */
    omit?: SaudeOmit<ExtArgs> | null
    /**
     * Filter which Saude to delete.
     */
    where: SaudeWhereUniqueInput
  }

  /**
   * Saude deleteMany
   */
  export type SaudeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Saudes to delete
     */
    where?: SaudeWhereInput
    /**
     * Limit how many Saudes to delete.
     */
    limit?: number
  }

  /**
   * Saude findRaw
   */
  export type SaudeFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Saude aggregateRaw
   */
  export type SaudeAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Saude without action
   */
  export type SaudeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Saude
     */
    select?: SaudeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Saude
     */
    omit?: SaudeOmit<ExtArgs> | null
  }


  /**
   * Model CulturaLazer
   */

  export type AggregateCulturaLazer = {
    _count: CulturaLazerCountAggregateOutputType | null
    _min: CulturaLazerMinAggregateOutputType | null
    _max: CulturaLazerMaxAggregateOutputType | null
  }

  export type CulturaLazerMinAggregateOutputType = {
    id: string | null
    evento: string | null
    local: string | null
    data: string | null
    horario: string | null
    organizador: string | null
    tipo: string | null
  }

  export type CulturaLazerMaxAggregateOutputType = {
    id: string | null
    evento: string | null
    local: string | null
    data: string | null
    horario: string | null
    organizador: string | null
    tipo: string | null
  }

  export type CulturaLazerCountAggregateOutputType = {
    id: number
    evento: number
    local: number
    data: number
    horario: number
    organizador: number
    tipo: number
    _all: number
  }


  export type CulturaLazerMinAggregateInputType = {
    id?: true
    evento?: true
    local?: true
    data?: true
    horario?: true
    organizador?: true
    tipo?: true
  }

  export type CulturaLazerMaxAggregateInputType = {
    id?: true
    evento?: true
    local?: true
    data?: true
    horario?: true
    organizador?: true
    tipo?: true
  }

  export type CulturaLazerCountAggregateInputType = {
    id?: true
    evento?: true
    local?: true
    data?: true
    horario?: true
    organizador?: true
    tipo?: true
    _all?: true
  }

  export type CulturaLazerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CulturaLazer to aggregate.
     */
    where?: CulturaLazerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CulturaLazers to fetch.
     */
    orderBy?: CulturaLazerOrderByWithRelationInput | CulturaLazerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CulturaLazerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CulturaLazers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CulturaLazers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CulturaLazers
    **/
    _count?: true | CulturaLazerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CulturaLazerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CulturaLazerMaxAggregateInputType
  }

  export type GetCulturaLazerAggregateType<T extends CulturaLazerAggregateArgs> = {
        [P in keyof T & keyof AggregateCulturaLazer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCulturaLazer[P]>
      : GetScalarType<T[P], AggregateCulturaLazer[P]>
  }




  export type CulturaLazerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CulturaLazerWhereInput
    orderBy?: CulturaLazerOrderByWithAggregationInput | CulturaLazerOrderByWithAggregationInput[]
    by: CulturaLazerScalarFieldEnum[] | CulturaLazerScalarFieldEnum
    having?: CulturaLazerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CulturaLazerCountAggregateInputType | true
    _min?: CulturaLazerMinAggregateInputType
    _max?: CulturaLazerMaxAggregateInputType
  }

  export type CulturaLazerGroupByOutputType = {
    id: string
    evento: string
    local: string
    data: string
    horario: string
    organizador: string
    tipo: string | null
    _count: CulturaLazerCountAggregateOutputType | null
    _min: CulturaLazerMinAggregateOutputType | null
    _max: CulturaLazerMaxAggregateOutputType | null
  }

  type GetCulturaLazerGroupByPayload<T extends CulturaLazerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CulturaLazerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CulturaLazerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CulturaLazerGroupByOutputType[P]>
            : GetScalarType<T[P], CulturaLazerGroupByOutputType[P]>
        }
      >
    >


  export type CulturaLazerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    evento?: boolean
    local?: boolean
    data?: boolean
    horario?: boolean
    organizador?: boolean
    tipo?: boolean
  }, ExtArgs["result"]["culturaLazer"]>



  export type CulturaLazerSelectScalar = {
    id?: boolean
    evento?: boolean
    local?: boolean
    data?: boolean
    horario?: boolean
    organizador?: boolean
    tipo?: boolean
  }

  export type CulturaLazerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "evento" | "local" | "data" | "horario" | "organizador" | "tipo", ExtArgs["result"]["culturaLazer"]>

  export type $CulturaLazerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CulturaLazer"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      evento: string
      local: string
      data: string
      horario: string
      organizador: string
      tipo: string | null
    }, ExtArgs["result"]["culturaLazer"]>
    composites: {}
  }

  type CulturaLazerGetPayload<S extends boolean | null | undefined | CulturaLazerDefaultArgs> = $Result.GetResult<Prisma.$CulturaLazerPayload, S>

  type CulturaLazerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CulturaLazerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CulturaLazerCountAggregateInputType | true
    }

  export interface CulturaLazerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CulturaLazer'], meta: { name: 'CulturaLazer' } }
    /**
     * Find zero or one CulturaLazer that matches the filter.
     * @param {CulturaLazerFindUniqueArgs} args - Arguments to find a CulturaLazer
     * @example
     * // Get one CulturaLazer
     * const culturaLazer = await prisma.culturaLazer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CulturaLazerFindUniqueArgs>(args: SelectSubset<T, CulturaLazerFindUniqueArgs<ExtArgs>>): Prisma__CulturaLazerClient<$Result.GetResult<Prisma.$CulturaLazerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CulturaLazer that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CulturaLazerFindUniqueOrThrowArgs} args - Arguments to find a CulturaLazer
     * @example
     * // Get one CulturaLazer
     * const culturaLazer = await prisma.culturaLazer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CulturaLazerFindUniqueOrThrowArgs>(args: SelectSubset<T, CulturaLazerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CulturaLazerClient<$Result.GetResult<Prisma.$CulturaLazerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CulturaLazer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CulturaLazerFindFirstArgs} args - Arguments to find a CulturaLazer
     * @example
     * // Get one CulturaLazer
     * const culturaLazer = await prisma.culturaLazer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CulturaLazerFindFirstArgs>(args?: SelectSubset<T, CulturaLazerFindFirstArgs<ExtArgs>>): Prisma__CulturaLazerClient<$Result.GetResult<Prisma.$CulturaLazerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CulturaLazer that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CulturaLazerFindFirstOrThrowArgs} args - Arguments to find a CulturaLazer
     * @example
     * // Get one CulturaLazer
     * const culturaLazer = await prisma.culturaLazer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CulturaLazerFindFirstOrThrowArgs>(args?: SelectSubset<T, CulturaLazerFindFirstOrThrowArgs<ExtArgs>>): Prisma__CulturaLazerClient<$Result.GetResult<Prisma.$CulturaLazerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CulturaLazers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CulturaLazerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CulturaLazers
     * const culturaLazers = await prisma.culturaLazer.findMany()
     * 
     * // Get first 10 CulturaLazers
     * const culturaLazers = await prisma.culturaLazer.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const culturaLazerWithIdOnly = await prisma.culturaLazer.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CulturaLazerFindManyArgs>(args?: SelectSubset<T, CulturaLazerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CulturaLazerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CulturaLazer.
     * @param {CulturaLazerCreateArgs} args - Arguments to create a CulturaLazer.
     * @example
     * // Create one CulturaLazer
     * const CulturaLazer = await prisma.culturaLazer.create({
     *   data: {
     *     // ... data to create a CulturaLazer
     *   }
     * })
     * 
     */
    create<T extends CulturaLazerCreateArgs>(args: SelectSubset<T, CulturaLazerCreateArgs<ExtArgs>>): Prisma__CulturaLazerClient<$Result.GetResult<Prisma.$CulturaLazerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CulturaLazers.
     * @param {CulturaLazerCreateManyArgs} args - Arguments to create many CulturaLazers.
     * @example
     * // Create many CulturaLazers
     * const culturaLazer = await prisma.culturaLazer.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CulturaLazerCreateManyArgs>(args?: SelectSubset<T, CulturaLazerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a CulturaLazer.
     * @param {CulturaLazerDeleteArgs} args - Arguments to delete one CulturaLazer.
     * @example
     * // Delete one CulturaLazer
     * const CulturaLazer = await prisma.culturaLazer.delete({
     *   where: {
     *     // ... filter to delete one CulturaLazer
     *   }
     * })
     * 
     */
    delete<T extends CulturaLazerDeleteArgs>(args: SelectSubset<T, CulturaLazerDeleteArgs<ExtArgs>>): Prisma__CulturaLazerClient<$Result.GetResult<Prisma.$CulturaLazerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CulturaLazer.
     * @param {CulturaLazerUpdateArgs} args - Arguments to update one CulturaLazer.
     * @example
     * // Update one CulturaLazer
     * const culturaLazer = await prisma.culturaLazer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CulturaLazerUpdateArgs>(args: SelectSubset<T, CulturaLazerUpdateArgs<ExtArgs>>): Prisma__CulturaLazerClient<$Result.GetResult<Prisma.$CulturaLazerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CulturaLazers.
     * @param {CulturaLazerDeleteManyArgs} args - Arguments to filter CulturaLazers to delete.
     * @example
     * // Delete a few CulturaLazers
     * const { count } = await prisma.culturaLazer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CulturaLazerDeleteManyArgs>(args?: SelectSubset<T, CulturaLazerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CulturaLazers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CulturaLazerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CulturaLazers
     * const culturaLazer = await prisma.culturaLazer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CulturaLazerUpdateManyArgs>(args: SelectSubset<T, CulturaLazerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one CulturaLazer.
     * @param {CulturaLazerUpsertArgs} args - Arguments to update or create a CulturaLazer.
     * @example
     * // Update or create a CulturaLazer
     * const culturaLazer = await prisma.culturaLazer.upsert({
     *   create: {
     *     // ... data to create a CulturaLazer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CulturaLazer we want to update
     *   }
     * })
     */
    upsert<T extends CulturaLazerUpsertArgs>(args: SelectSubset<T, CulturaLazerUpsertArgs<ExtArgs>>): Prisma__CulturaLazerClient<$Result.GetResult<Prisma.$CulturaLazerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CulturaLazers that matches the filter.
     * @param {CulturaLazerFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const culturaLazer = await prisma.culturaLazer.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: CulturaLazerFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a CulturaLazer.
     * @param {CulturaLazerAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const culturaLazer = await prisma.culturaLazer.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: CulturaLazerAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of CulturaLazers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CulturaLazerCountArgs} args - Arguments to filter CulturaLazers to count.
     * @example
     * // Count the number of CulturaLazers
     * const count = await prisma.culturaLazer.count({
     *   where: {
     *     // ... the filter for the CulturaLazers we want to count
     *   }
     * })
    **/
    count<T extends CulturaLazerCountArgs>(
      args?: Subset<T, CulturaLazerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CulturaLazerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CulturaLazer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CulturaLazerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CulturaLazerAggregateArgs>(args: Subset<T, CulturaLazerAggregateArgs>): Prisma.PrismaPromise<GetCulturaLazerAggregateType<T>>

    /**
     * Group by CulturaLazer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CulturaLazerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CulturaLazerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CulturaLazerGroupByArgs['orderBy'] }
        : { orderBy?: CulturaLazerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CulturaLazerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCulturaLazerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CulturaLazer model
   */
  readonly fields: CulturaLazerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CulturaLazer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CulturaLazerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CulturaLazer model
   */
  interface CulturaLazerFieldRefs {
    readonly id: FieldRef<"CulturaLazer", 'String'>
    readonly evento: FieldRef<"CulturaLazer", 'String'>
    readonly local: FieldRef<"CulturaLazer", 'String'>
    readonly data: FieldRef<"CulturaLazer", 'String'>
    readonly horario: FieldRef<"CulturaLazer", 'String'>
    readonly organizador: FieldRef<"CulturaLazer", 'String'>
    readonly tipo: FieldRef<"CulturaLazer", 'String'>
  }
    

  // Custom InputTypes
  /**
   * CulturaLazer findUnique
   */
  export type CulturaLazerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CulturaLazer
     */
    select?: CulturaLazerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CulturaLazer
     */
    omit?: CulturaLazerOmit<ExtArgs> | null
    /**
     * Filter, which CulturaLazer to fetch.
     */
    where: CulturaLazerWhereUniqueInput
  }

  /**
   * CulturaLazer findUniqueOrThrow
   */
  export type CulturaLazerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CulturaLazer
     */
    select?: CulturaLazerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CulturaLazer
     */
    omit?: CulturaLazerOmit<ExtArgs> | null
    /**
     * Filter, which CulturaLazer to fetch.
     */
    where: CulturaLazerWhereUniqueInput
  }

  /**
   * CulturaLazer findFirst
   */
  export type CulturaLazerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CulturaLazer
     */
    select?: CulturaLazerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CulturaLazer
     */
    omit?: CulturaLazerOmit<ExtArgs> | null
    /**
     * Filter, which CulturaLazer to fetch.
     */
    where?: CulturaLazerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CulturaLazers to fetch.
     */
    orderBy?: CulturaLazerOrderByWithRelationInput | CulturaLazerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CulturaLazers.
     */
    cursor?: CulturaLazerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CulturaLazers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CulturaLazers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CulturaLazers.
     */
    distinct?: CulturaLazerScalarFieldEnum | CulturaLazerScalarFieldEnum[]
  }

  /**
   * CulturaLazer findFirstOrThrow
   */
  export type CulturaLazerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CulturaLazer
     */
    select?: CulturaLazerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CulturaLazer
     */
    omit?: CulturaLazerOmit<ExtArgs> | null
    /**
     * Filter, which CulturaLazer to fetch.
     */
    where?: CulturaLazerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CulturaLazers to fetch.
     */
    orderBy?: CulturaLazerOrderByWithRelationInput | CulturaLazerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CulturaLazers.
     */
    cursor?: CulturaLazerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CulturaLazers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CulturaLazers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CulturaLazers.
     */
    distinct?: CulturaLazerScalarFieldEnum | CulturaLazerScalarFieldEnum[]
  }

  /**
   * CulturaLazer findMany
   */
  export type CulturaLazerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CulturaLazer
     */
    select?: CulturaLazerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CulturaLazer
     */
    omit?: CulturaLazerOmit<ExtArgs> | null
    /**
     * Filter, which CulturaLazers to fetch.
     */
    where?: CulturaLazerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CulturaLazers to fetch.
     */
    orderBy?: CulturaLazerOrderByWithRelationInput | CulturaLazerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CulturaLazers.
     */
    cursor?: CulturaLazerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CulturaLazers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CulturaLazers.
     */
    skip?: number
    distinct?: CulturaLazerScalarFieldEnum | CulturaLazerScalarFieldEnum[]
  }

  /**
   * CulturaLazer create
   */
  export type CulturaLazerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CulturaLazer
     */
    select?: CulturaLazerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CulturaLazer
     */
    omit?: CulturaLazerOmit<ExtArgs> | null
    /**
     * The data needed to create a CulturaLazer.
     */
    data: XOR<CulturaLazerCreateInput, CulturaLazerUncheckedCreateInput>
  }

  /**
   * CulturaLazer createMany
   */
  export type CulturaLazerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CulturaLazers.
     */
    data: CulturaLazerCreateManyInput | CulturaLazerCreateManyInput[]
  }

  /**
   * CulturaLazer update
   */
  export type CulturaLazerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CulturaLazer
     */
    select?: CulturaLazerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CulturaLazer
     */
    omit?: CulturaLazerOmit<ExtArgs> | null
    /**
     * The data needed to update a CulturaLazer.
     */
    data: XOR<CulturaLazerUpdateInput, CulturaLazerUncheckedUpdateInput>
    /**
     * Choose, which CulturaLazer to update.
     */
    where: CulturaLazerWhereUniqueInput
  }

  /**
   * CulturaLazer updateMany
   */
  export type CulturaLazerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CulturaLazers.
     */
    data: XOR<CulturaLazerUpdateManyMutationInput, CulturaLazerUncheckedUpdateManyInput>
    /**
     * Filter which CulturaLazers to update
     */
    where?: CulturaLazerWhereInput
    /**
     * Limit how many CulturaLazers to update.
     */
    limit?: number
  }

  /**
   * CulturaLazer upsert
   */
  export type CulturaLazerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CulturaLazer
     */
    select?: CulturaLazerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CulturaLazer
     */
    omit?: CulturaLazerOmit<ExtArgs> | null
    /**
     * The filter to search for the CulturaLazer to update in case it exists.
     */
    where: CulturaLazerWhereUniqueInput
    /**
     * In case the CulturaLazer found by the `where` argument doesn't exist, create a new CulturaLazer with this data.
     */
    create: XOR<CulturaLazerCreateInput, CulturaLazerUncheckedCreateInput>
    /**
     * In case the CulturaLazer was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CulturaLazerUpdateInput, CulturaLazerUncheckedUpdateInput>
  }

  /**
   * CulturaLazer delete
   */
  export type CulturaLazerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CulturaLazer
     */
    select?: CulturaLazerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CulturaLazer
     */
    omit?: CulturaLazerOmit<ExtArgs> | null
    /**
     * Filter which CulturaLazer to delete.
     */
    where: CulturaLazerWhereUniqueInput
  }

  /**
   * CulturaLazer deleteMany
   */
  export type CulturaLazerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CulturaLazers to delete
     */
    where?: CulturaLazerWhereInput
    /**
     * Limit how many CulturaLazers to delete.
     */
    limit?: number
  }

  /**
   * CulturaLazer findRaw
   */
  export type CulturaLazerFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * CulturaLazer aggregateRaw
   */
  export type CulturaLazerAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * CulturaLazer without action
   */
  export type CulturaLazerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CulturaLazer
     */
    select?: CulturaLazerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CulturaLazer
     */
    omit?: CulturaLazerOmit<ExtArgs> | null
  }


  /**
   * Model Educacao
   */

  export type AggregateEducacao = {
    _count: EducacaoCountAggregateOutputType | null
    _min: EducacaoMinAggregateOutputType | null
    _max: EducacaoMaxAggregateOutputType | null
  }

  export type EducacaoMinAggregateOutputType = {
    id: string | null
    nomeInstituicao: string | null
    tipoInstituicao: string | null
    endereco: string | null
    contato: string | null
    orgaoResponsavel: string | null
  }

  export type EducacaoMaxAggregateOutputType = {
    id: string | null
    nomeInstituicao: string | null
    tipoInstituicao: string | null
    endereco: string | null
    contato: string | null
    orgaoResponsavel: string | null
  }

  export type EducacaoCountAggregateOutputType = {
    id: number
    nomeInstituicao: number
    tipoInstituicao: number
    endereco: number
    contato: number
    orgaoResponsavel: number
    _all: number
  }


  export type EducacaoMinAggregateInputType = {
    id?: true
    nomeInstituicao?: true
    tipoInstituicao?: true
    endereco?: true
    contato?: true
    orgaoResponsavel?: true
  }

  export type EducacaoMaxAggregateInputType = {
    id?: true
    nomeInstituicao?: true
    tipoInstituicao?: true
    endereco?: true
    contato?: true
    orgaoResponsavel?: true
  }

  export type EducacaoCountAggregateInputType = {
    id?: true
    nomeInstituicao?: true
    tipoInstituicao?: true
    endereco?: true
    contato?: true
    orgaoResponsavel?: true
    _all?: true
  }

  export type EducacaoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Educacao to aggregate.
     */
    where?: EducacaoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Educacaos to fetch.
     */
    orderBy?: EducacaoOrderByWithRelationInput | EducacaoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EducacaoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Educacaos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Educacaos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Educacaos
    **/
    _count?: true | EducacaoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EducacaoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EducacaoMaxAggregateInputType
  }

  export type GetEducacaoAggregateType<T extends EducacaoAggregateArgs> = {
        [P in keyof T & keyof AggregateEducacao]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEducacao[P]>
      : GetScalarType<T[P], AggregateEducacao[P]>
  }




  export type EducacaoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EducacaoWhereInput
    orderBy?: EducacaoOrderByWithAggregationInput | EducacaoOrderByWithAggregationInput[]
    by: EducacaoScalarFieldEnum[] | EducacaoScalarFieldEnum
    having?: EducacaoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EducacaoCountAggregateInputType | true
    _min?: EducacaoMinAggregateInputType
    _max?: EducacaoMaxAggregateInputType
  }

  export type EducacaoGroupByOutputType = {
    id: string
    nomeInstituicao: string
    tipoInstituicao: string
    endereco: string
    contato: string | null
    orgaoResponsavel: string
    _count: EducacaoCountAggregateOutputType | null
    _min: EducacaoMinAggregateOutputType | null
    _max: EducacaoMaxAggregateOutputType | null
  }

  type GetEducacaoGroupByPayload<T extends EducacaoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EducacaoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EducacaoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EducacaoGroupByOutputType[P]>
            : GetScalarType<T[P], EducacaoGroupByOutputType[P]>
        }
      >
    >


  export type EducacaoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nomeInstituicao?: boolean
    tipoInstituicao?: boolean
    endereco?: boolean
    contato?: boolean
    orgaoResponsavel?: boolean
  }, ExtArgs["result"]["educacao"]>



  export type EducacaoSelectScalar = {
    id?: boolean
    nomeInstituicao?: boolean
    tipoInstituicao?: boolean
    endereco?: boolean
    contato?: boolean
    orgaoResponsavel?: boolean
  }

  export type EducacaoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nomeInstituicao" | "tipoInstituicao" | "endereco" | "contato" | "orgaoResponsavel", ExtArgs["result"]["educacao"]>

  export type $EducacaoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Educacao"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nomeInstituicao: string
      tipoInstituicao: string
      endereco: string
      contato: string | null
      orgaoResponsavel: string
    }, ExtArgs["result"]["educacao"]>
    composites: {}
  }

  type EducacaoGetPayload<S extends boolean | null | undefined | EducacaoDefaultArgs> = $Result.GetResult<Prisma.$EducacaoPayload, S>

  type EducacaoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EducacaoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EducacaoCountAggregateInputType | true
    }

  export interface EducacaoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Educacao'], meta: { name: 'Educacao' } }
    /**
     * Find zero or one Educacao that matches the filter.
     * @param {EducacaoFindUniqueArgs} args - Arguments to find a Educacao
     * @example
     * // Get one Educacao
     * const educacao = await prisma.educacao.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EducacaoFindUniqueArgs>(args: SelectSubset<T, EducacaoFindUniqueArgs<ExtArgs>>): Prisma__EducacaoClient<$Result.GetResult<Prisma.$EducacaoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Educacao that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EducacaoFindUniqueOrThrowArgs} args - Arguments to find a Educacao
     * @example
     * // Get one Educacao
     * const educacao = await prisma.educacao.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EducacaoFindUniqueOrThrowArgs>(args: SelectSubset<T, EducacaoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EducacaoClient<$Result.GetResult<Prisma.$EducacaoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Educacao that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EducacaoFindFirstArgs} args - Arguments to find a Educacao
     * @example
     * // Get one Educacao
     * const educacao = await prisma.educacao.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EducacaoFindFirstArgs>(args?: SelectSubset<T, EducacaoFindFirstArgs<ExtArgs>>): Prisma__EducacaoClient<$Result.GetResult<Prisma.$EducacaoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Educacao that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EducacaoFindFirstOrThrowArgs} args - Arguments to find a Educacao
     * @example
     * // Get one Educacao
     * const educacao = await prisma.educacao.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EducacaoFindFirstOrThrowArgs>(args?: SelectSubset<T, EducacaoFindFirstOrThrowArgs<ExtArgs>>): Prisma__EducacaoClient<$Result.GetResult<Prisma.$EducacaoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Educacaos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EducacaoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Educacaos
     * const educacaos = await prisma.educacao.findMany()
     * 
     * // Get first 10 Educacaos
     * const educacaos = await prisma.educacao.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const educacaoWithIdOnly = await prisma.educacao.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EducacaoFindManyArgs>(args?: SelectSubset<T, EducacaoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EducacaoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Educacao.
     * @param {EducacaoCreateArgs} args - Arguments to create a Educacao.
     * @example
     * // Create one Educacao
     * const Educacao = await prisma.educacao.create({
     *   data: {
     *     // ... data to create a Educacao
     *   }
     * })
     * 
     */
    create<T extends EducacaoCreateArgs>(args: SelectSubset<T, EducacaoCreateArgs<ExtArgs>>): Prisma__EducacaoClient<$Result.GetResult<Prisma.$EducacaoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Educacaos.
     * @param {EducacaoCreateManyArgs} args - Arguments to create many Educacaos.
     * @example
     * // Create many Educacaos
     * const educacao = await prisma.educacao.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EducacaoCreateManyArgs>(args?: SelectSubset<T, EducacaoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Educacao.
     * @param {EducacaoDeleteArgs} args - Arguments to delete one Educacao.
     * @example
     * // Delete one Educacao
     * const Educacao = await prisma.educacao.delete({
     *   where: {
     *     // ... filter to delete one Educacao
     *   }
     * })
     * 
     */
    delete<T extends EducacaoDeleteArgs>(args: SelectSubset<T, EducacaoDeleteArgs<ExtArgs>>): Prisma__EducacaoClient<$Result.GetResult<Prisma.$EducacaoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Educacao.
     * @param {EducacaoUpdateArgs} args - Arguments to update one Educacao.
     * @example
     * // Update one Educacao
     * const educacao = await prisma.educacao.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EducacaoUpdateArgs>(args: SelectSubset<T, EducacaoUpdateArgs<ExtArgs>>): Prisma__EducacaoClient<$Result.GetResult<Prisma.$EducacaoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Educacaos.
     * @param {EducacaoDeleteManyArgs} args - Arguments to filter Educacaos to delete.
     * @example
     * // Delete a few Educacaos
     * const { count } = await prisma.educacao.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EducacaoDeleteManyArgs>(args?: SelectSubset<T, EducacaoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Educacaos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EducacaoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Educacaos
     * const educacao = await prisma.educacao.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EducacaoUpdateManyArgs>(args: SelectSubset<T, EducacaoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Educacao.
     * @param {EducacaoUpsertArgs} args - Arguments to update or create a Educacao.
     * @example
     * // Update or create a Educacao
     * const educacao = await prisma.educacao.upsert({
     *   create: {
     *     // ... data to create a Educacao
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Educacao we want to update
     *   }
     * })
     */
    upsert<T extends EducacaoUpsertArgs>(args: SelectSubset<T, EducacaoUpsertArgs<ExtArgs>>): Prisma__EducacaoClient<$Result.GetResult<Prisma.$EducacaoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Educacaos that matches the filter.
     * @param {EducacaoFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const educacao = await prisma.educacao.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: EducacaoFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Educacao.
     * @param {EducacaoAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const educacao = await prisma.educacao.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: EducacaoAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Educacaos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EducacaoCountArgs} args - Arguments to filter Educacaos to count.
     * @example
     * // Count the number of Educacaos
     * const count = await prisma.educacao.count({
     *   where: {
     *     // ... the filter for the Educacaos we want to count
     *   }
     * })
    **/
    count<T extends EducacaoCountArgs>(
      args?: Subset<T, EducacaoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EducacaoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Educacao.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EducacaoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EducacaoAggregateArgs>(args: Subset<T, EducacaoAggregateArgs>): Prisma.PrismaPromise<GetEducacaoAggregateType<T>>

    /**
     * Group by Educacao.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EducacaoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EducacaoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EducacaoGroupByArgs['orderBy'] }
        : { orderBy?: EducacaoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EducacaoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEducacaoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Educacao model
   */
  readonly fields: EducacaoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Educacao.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EducacaoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Educacao model
   */
  interface EducacaoFieldRefs {
    readonly id: FieldRef<"Educacao", 'String'>
    readonly nomeInstituicao: FieldRef<"Educacao", 'String'>
    readonly tipoInstituicao: FieldRef<"Educacao", 'String'>
    readonly endereco: FieldRef<"Educacao", 'String'>
    readonly contato: FieldRef<"Educacao", 'String'>
    readonly orgaoResponsavel: FieldRef<"Educacao", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Educacao findUnique
   */
  export type EducacaoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Educacao
     */
    select?: EducacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Educacao
     */
    omit?: EducacaoOmit<ExtArgs> | null
    /**
     * Filter, which Educacao to fetch.
     */
    where: EducacaoWhereUniqueInput
  }

  /**
   * Educacao findUniqueOrThrow
   */
  export type EducacaoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Educacao
     */
    select?: EducacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Educacao
     */
    omit?: EducacaoOmit<ExtArgs> | null
    /**
     * Filter, which Educacao to fetch.
     */
    where: EducacaoWhereUniqueInput
  }

  /**
   * Educacao findFirst
   */
  export type EducacaoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Educacao
     */
    select?: EducacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Educacao
     */
    omit?: EducacaoOmit<ExtArgs> | null
    /**
     * Filter, which Educacao to fetch.
     */
    where?: EducacaoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Educacaos to fetch.
     */
    orderBy?: EducacaoOrderByWithRelationInput | EducacaoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Educacaos.
     */
    cursor?: EducacaoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Educacaos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Educacaos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Educacaos.
     */
    distinct?: EducacaoScalarFieldEnum | EducacaoScalarFieldEnum[]
  }

  /**
   * Educacao findFirstOrThrow
   */
  export type EducacaoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Educacao
     */
    select?: EducacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Educacao
     */
    omit?: EducacaoOmit<ExtArgs> | null
    /**
     * Filter, which Educacao to fetch.
     */
    where?: EducacaoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Educacaos to fetch.
     */
    orderBy?: EducacaoOrderByWithRelationInput | EducacaoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Educacaos.
     */
    cursor?: EducacaoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Educacaos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Educacaos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Educacaos.
     */
    distinct?: EducacaoScalarFieldEnum | EducacaoScalarFieldEnum[]
  }

  /**
   * Educacao findMany
   */
  export type EducacaoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Educacao
     */
    select?: EducacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Educacao
     */
    omit?: EducacaoOmit<ExtArgs> | null
    /**
     * Filter, which Educacaos to fetch.
     */
    where?: EducacaoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Educacaos to fetch.
     */
    orderBy?: EducacaoOrderByWithRelationInput | EducacaoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Educacaos.
     */
    cursor?: EducacaoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Educacaos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Educacaos.
     */
    skip?: number
    distinct?: EducacaoScalarFieldEnum | EducacaoScalarFieldEnum[]
  }

  /**
   * Educacao create
   */
  export type EducacaoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Educacao
     */
    select?: EducacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Educacao
     */
    omit?: EducacaoOmit<ExtArgs> | null
    /**
     * The data needed to create a Educacao.
     */
    data: XOR<EducacaoCreateInput, EducacaoUncheckedCreateInput>
  }

  /**
   * Educacao createMany
   */
  export type EducacaoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Educacaos.
     */
    data: EducacaoCreateManyInput | EducacaoCreateManyInput[]
  }

  /**
   * Educacao update
   */
  export type EducacaoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Educacao
     */
    select?: EducacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Educacao
     */
    omit?: EducacaoOmit<ExtArgs> | null
    /**
     * The data needed to update a Educacao.
     */
    data: XOR<EducacaoUpdateInput, EducacaoUncheckedUpdateInput>
    /**
     * Choose, which Educacao to update.
     */
    where: EducacaoWhereUniqueInput
  }

  /**
   * Educacao updateMany
   */
  export type EducacaoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Educacaos.
     */
    data: XOR<EducacaoUpdateManyMutationInput, EducacaoUncheckedUpdateManyInput>
    /**
     * Filter which Educacaos to update
     */
    where?: EducacaoWhereInput
    /**
     * Limit how many Educacaos to update.
     */
    limit?: number
  }

  /**
   * Educacao upsert
   */
  export type EducacaoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Educacao
     */
    select?: EducacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Educacao
     */
    omit?: EducacaoOmit<ExtArgs> | null
    /**
     * The filter to search for the Educacao to update in case it exists.
     */
    where: EducacaoWhereUniqueInput
    /**
     * In case the Educacao found by the `where` argument doesn't exist, create a new Educacao with this data.
     */
    create: XOR<EducacaoCreateInput, EducacaoUncheckedCreateInput>
    /**
     * In case the Educacao was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EducacaoUpdateInput, EducacaoUncheckedUpdateInput>
  }

  /**
   * Educacao delete
   */
  export type EducacaoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Educacao
     */
    select?: EducacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Educacao
     */
    omit?: EducacaoOmit<ExtArgs> | null
    /**
     * Filter which Educacao to delete.
     */
    where: EducacaoWhereUniqueInput
  }

  /**
   * Educacao deleteMany
   */
  export type EducacaoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Educacaos to delete
     */
    where?: EducacaoWhereInput
    /**
     * Limit how many Educacaos to delete.
     */
    limit?: number
  }

  /**
   * Educacao findRaw
   */
  export type EducacaoFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Educacao aggregateRaw
   */
  export type EducacaoAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Educacao without action
   */
  export type EducacaoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Educacao
     */
    select?: EducacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Educacao
     */
    omit?: EducacaoOmit<ExtArgs> | null
  }


  /**
   * Model Urgencia
   */

  export type AggregateUrgencia = {
    _count: UrgenciaCountAggregateOutputType | null
    _min: UrgenciaMinAggregateOutputType | null
    _max: UrgenciaMaxAggregateOutputType | null
  }

  export type UrgenciaMinAggregateOutputType = {
    id: string | null
    tipoServico: string | null
    contato: string | null
    localizacao: string | null
    descricao: string | null
    disponibilidade: string | null
  }

  export type UrgenciaMaxAggregateOutputType = {
    id: string | null
    tipoServico: string | null
    contato: string | null
    localizacao: string | null
    descricao: string | null
    disponibilidade: string | null
  }

  export type UrgenciaCountAggregateOutputType = {
    id: number
    tipoServico: number
    contato: number
    localizacao: number
    descricao: number
    disponibilidade: number
    _all: number
  }


  export type UrgenciaMinAggregateInputType = {
    id?: true
    tipoServico?: true
    contato?: true
    localizacao?: true
    descricao?: true
    disponibilidade?: true
  }

  export type UrgenciaMaxAggregateInputType = {
    id?: true
    tipoServico?: true
    contato?: true
    localizacao?: true
    descricao?: true
    disponibilidade?: true
  }

  export type UrgenciaCountAggregateInputType = {
    id?: true
    tipoServico?: true
    contato?: true
    localizacao?: true
    descricao?: true
    disponibilidade?: true
    _all?: true
  }

  export type UrgenciaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Urgencia to aggregate.
     */
    where?: UrgenciaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Urgencias to fetch.
     */
    orderBy?: UrgenciaOrderByWithRelationInput | UrgenciaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UrgenciaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Urgencias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Urgencias.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Urgencias
    **/
    _count?: true | UrgenciaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UrgenciaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UrgenciaMaxAggregateInputType
  }

  export type GetUrgenciaAggregateType<T extends UrgenciaAggregateArgs> = {
        [P in keyof T & keyof AggregateUrgencia]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUrgencia[P]>
      : GetScalarType<T[P], AggregateUrgencia[P]>
  }




  export type UrgenciaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UrgenciaWhereInput
    orderBy?: UrgenciaOrderByWithAggregationInput | UrgenciaOrderByWithAggregationInput[]
    by: UrgenciaScalarFieldEnum[] | UrgenciaScalarFieldEnum
    having?: UrgenciaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UrgenciaCountAggregateInputType | true
    _min?: UrgenciaMinAggregateInputType
    _max?: UrgenciaMaxAggregateInputType
  }

  export type UrgenciaGroupByOutputType = {
    id: string
    tipoServico: string
    contato: string
    localizacao: string
    descricao: string | null
    disponibilidade: string | null
    _count: UrgenciaCountAggregateOutputType | null
    _min: UrgenciaMinAggregateOutputType | null
    _max: UrgenciaMaxAggregateOutputType | null
  }

  type GetUrgenciaGroupByPayload<T extends UrgenciaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UrgenciaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UrgenciaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UrgenciaGroupByOutputType[P]>
            : GetScalarType<T[P], UrgenciaGroupByOutputType[P]>
        }
      >
    >


  export type UrgenciaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tipoServico?: boolean
    contato?: boolean
    localizacao?: boolean
    descricao?: boolean
    disponibilidade?: boolean
  }, ExtArgs["result"]["urgencia"]>



  export type UrgenciaSelectScalar = {
    id?: boolean
    tipoServico?: boolean
    contato?: boolean
    localizacao?: boolean
    descricao?: boolean
    disponibilidade?: boolean
  }

  export type UrgenciaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tipoServico" | "contato" | "localizacao" | "descricao" | "disponibilidade", ExtArgs["result"]["urgencia"]>

  export type $UrgenciaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Urgencia"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tipoServico: string
      contato: string
      localizacao: string
      descricao: string | null
      disponibilidade: string | null
    }, ExtArgs["result"]["urgencia"]>
    composites: {}
  }

  type UrgenciaGetPayload<S extends boolean | null | undefined | UrgenciaDefaultArgs> = $Result.GetResult<Prisma.$UrgenciaPayload, S>

  type UrgenciaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UrgenciaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UrgenciaCountAggregateInputType | true
    }

  export interface UrgenciaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Urgencia'], meta: { name: 'Urgencia' } }
    /**
     * Find zero or one Urgencia that matches the filter.
     * @param {UrgenciaFindUniqueArgs} args - Arguments to find a Urgencia
     * @example
     * // Get one Urgencia
     * const urgencia = await prisma.urgencia.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UrgenciaFindUniqueArgs>(args: SelectSubset<T, UrgenciaFindUniqueArgs<ExtArgs>>): Prisma__UrgenciaClient<$Result.GetResult<Prisma.$UrgenciaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Urgencia that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UrgenciaFindUniqueOrThrowArgs} args - Arguments to find a Urgencia
     * @example
     * // Get one Urgencia
     * const urgencia = await prisma.urgencia.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UrgenciaFindUniqueOrThrowArgs>(args: SelectSubset<T, UrgenciaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UrgenciaClient<$Result.GetResult<Prisma.$UrgenciaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Urgencia that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UrgenciaFindFirstArgs} args - Arguments to find a Urgencia
     * @example
     * // Get one Urgencia
     * const urgencia = await prisma.urgencia.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UrgenciaFindFirstArgs>(args?: SelectSubset<T, UrgenciaFindFirstArgs<ExtArgs>>): Prisma__UrgenciaClient<$Result.GetResult<Prisma.$UrgenciaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Urgencia that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UrgenciaFindFirstOrThrowArgs} args - Arguments to find a Urgencia
     * @example
     * // Get one Urgencia
     * const urgencia = await prisma.urgencia.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UrgenciaFindFirstOrThrowArgs>(args?: SelectSubset<T, UrgenciaFindFirstOrThrowArgs<ExtArgs>>): Prisma__UrgenciaClient<$Result.GetResult<Prisma.$UrgenciaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Urgencias that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UrgenciaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Urgencias
     * const urgencias = await prisma.urgencia.findMany()
     * 
     * // Get first 10 Urgencias
     * const urgencias = await prisma.urgencia.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const urgenciaWithIdOnly = await prisma.urgencia.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UrgenciaFindManyArgs>(args?: SelectSubset<T, UrgenciaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UrgenciaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Urgencia.
     * @param {UrgenciaCreateArgs} args - Arguments to create a Urgencia.
     * @example
     * // Create one Urgencia
     * const Urgencia = await prisma.urgencia.create({
     *   data: {
     *     // ... data to create a Urgencia
     *   }
     * })
     * 
     */
    create<T extends UrgenciaCreateArgs>(args: SelectSubset<T, UrgenciaCreateArgs<ExtArgs>>): Prisma__UrgenciaClient<$Result.GetResult<Prisma.$UrgenciaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Urgencias.
     * @param {UrgenciaCreateManyArgs} args - Arguments to create many Urgencias.
     * @example
     * // Create many Urgencias
     * const urgencia = await prisma.urgencia.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UrgenciaCreateManyArgs>(args?: SelectSubset<T, UrgenciaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Urgencia.
     * @param {UrgenciaDeleteArgs} args - Arguments to delete one Urgencia.
     * @example
     * // Delete one Urgencia
     * const Urgencia = await prisma.urgencia.delete({
     *   where: {
     *     // ... filter to delete one Urgencia
     *   }
     * })
     * 
     */
    delete<T extends UrgenciaDeleteArgs>(args: SelectSubset<T, UrgenciaDeleteArgs<ExtArgs>>): Prisma__UrgenciaClient<$Result.GetResult<Prisma.$UrgenciaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Urgencia.
     * @param {UrgenciaUpdateArgs} args - Arguments to update one Urgencia.
     * @example
     * // Update one Urgencia
     * const urgencia = await prisma.urgencia.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UrgenciaUpdateArgs>(args: SelectSubset<T, UrgenciaUpdateArgs<ExtArgs>>): Prisma__UrgenciaClient<$Result.GetResult<Prisma.$UrgenciaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Urgencias.
     * @param {UrgenciaDeleteManyArgs} args - Arguments to filter Urgencias to delete.
     * @example
     * // Delete a few Urgencias
     * const { count } = await prisma.urgencia.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UrgenciaDeleteManyArgs>(args?: SelectSubset<T, UrgenciaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Urgencias.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UrgenciaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Urgencias
     * const urgencia = await prisma.urgencia.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UrgenciaUpdateManyArgs>(args: SelectSubset<T, UrgenciaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Urgencia.
     * @param {UrgenciaUpsertArgs} args - Arguments to update or create a Urgencia.
     * @example
     * // Update or create a Urgencia
     * const urgencia = await prisma.urgencia.upsert({
     *   create: {
     *     // ... data to create a Urgencia
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Urgencia we want to update
     *   }
     * })
     */
    upsert<T extends UrgenciaUpsertArgs>(args: SelectSubset<T, UrgenciaUpsertArgs<ExtArgs>>): Prisma__UrgenciaClient<$Result.GetResult<Prisma.$UrgenciaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Urgencias that matches the filter.
     * @param {UrgenciaFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const urgencia = await prisma.urgencia.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: UrgenciaFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Urgencia.
     * @param {UrgenciaAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const urgencia = await prisma.urgencia.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: UrgenciaAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Urgencias.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UrgenciaCountArgs} args - Arguments to filter Urgencias to count.
     * @example
     * // Count the number of Urgencias
     * const count = await prisma.urgencia.count({
     *   where: {
     *     // ... the filter for the Urgencias we want to count
     *   }
     * })
    **/
    count<T extends UrgenciaCountArgs>(
      args?: Subset<T, UrgenciaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UrgenciaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Urgencia.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UrgenciaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UrgenciaAggregateArgs>(args: Subset<T, UrgenciaAggregateArgs>): Prisma.PrismaPromise<GetUrgenciaAggregateType<T>>

    /**
     * Group by Urgencia.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UrgenciaGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UrgenciaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UrgenciaGroupByArgs['orderBy'] }
        : { orderBy?: UrgenciaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UrgenciaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUrgenciaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Urgencia model
   */
  readonly fields: UrgenciaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Urgencia.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UrgenciaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Urgencia model
   */
  interface UrgenciaFieldRefs {
    readonly id: FieldRef<"Urgencia", 'String'>
    readonly tipoServico: FieldRef<"Urgencia", 'String'>
    readonly contato: FieldRef<"Urgencia", 'String'>
    readonly localizacao: FieldRef<"Urgencia", 'String'>
    readonly descricao: FieldRef<"Urgencia", 'String'>
    readonly disponibilidade: FieldRef<"Urgencia", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Urgencia findUnique
   */
  export type UrgenciaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Urgencia
     */
    select?: UrgenciaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Urgencia
     */
    omit?: UrgenciaOmit<ExtArgs> | null
    /**
     * Filter, which Urgencia to fetch.
     */
    where: UrgenciaWhereUniqueInput
  }

  /**
   * Urgencia findUniqueOrThrow
   */
  export type UrgenciaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Urgencia
     */
    select?: UrgenciaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Urgencia
     */
    omit?: UrgenciaOmit<ExtArgs> | null
    /**
     * Filter, which Urgencia to fetch.
     */
    where: UrgenciaWhereUniqueInput
  }

  /**
   * Urgencia findFirst
   */
  export type UrgenciaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Urgencia
     */
    select?: UrgenciaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Urgencia
     */
    omit?: UrgenciaOmit<ExtArgs> | null
    /**
     * Filter, which Urgencia to fetch.
     */
    where?: UrgenciaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Urgencias to fetch.
     */
    orderBy?: UrgenciaOrderByWithRelationInput | UrgenciaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Urgencias.
     */
    cursor?: UrgenciaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Urgencias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Urgencias.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Urgencias.
     */
    distinct?: UrgenciaScalarFieldEnum | UrgenciaScalarFieldEnum[]
  }

  /**
   * Urgencia findFirstOrThrow
   */
  export type UrgenciaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Urgencia
     */
    select?: UrgenciaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Urgencia
     */
    omit?: UrgenciaOmit<ExtArgs> | null
    /**
     * Filter, which Urgencia to fetch.
     */
    where?: UrgenciaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Urgencias to fetch.
     */
    orderBy?: UrgenciaOrderByWithRelationInput | UrgenciaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Urgencias.
     */
    cursor?: UrgenciaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Urgencias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Urgencias.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Urgencias.
     */
    distinct?: UrgenciaScalarFieldEnum | UrgenciaScalarFieldEnum[]
  }

  /**
   * Urgencia findMany
   */
  export type UrgenciaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Urgencia
     */
    select?: UrgenciaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Urgencia
     */
    omit?: UrgenciaOmit<ExtArgs> | null
    /**
     * Filter, which Urgencias to fetch.
     */
    where?: UrgenciaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Urgencias to fetch.
     */
    orderBy?: UrgenciaOrderByWithRelationInput | UrgenciaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Urgencias.
     */
    cursor?: UrgenciaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Urgencias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Urgencias.
     */
    skip?: number
    distinct?: UrgenciaScalarFieldEnum | UrgenciaScalarFieldEnum[]
  }

  /**
   * Urgencia create
   */
  export type UrgenciaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Urgencia
     */
    select?: UrgenciaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Urgencia
     */
    omit?: UrgenciaOmit<ExtArgs> | null
    /**
     * The data needed to create a Urgencia.
     */
    data: XOR<UrgenciaCreateInput, UrgenciaUncheckedCreateInput>
  }

  /**
   * Urgencia createMany
   */
  export type UrgenciaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Urgencias.
     */
    data: UrgenciaCreateManyInput | UrgenciaCreateManyInput[]
  }

  /**
   * Urgencia update
   */
  export type UrgenciaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Urgencia
     */
    select?: UrgenciaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Urgencia
     */
    omit?: UrgenciaOmit<ExtArgs> | null
    /**
     * The data needed to update a Urgencia.
     */
    data: XOR<UrgenciaUpdateInput, UrgenciaUncheckedUpdateInput>
    /**
     * Choose, which Urgencia to update.
     */
    where: UrgenciaWhereUniqueInput
  }

  /**
   * Urgencia updateMany
   */
  export type UrgenciaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Urgencias.
     */
    data: XOR<UrgenciaUpdateManyMutationInput, UrgenciaUncheckedUpdateManyInput>
    /**
     * Filter which Urgencias to update
     */
    where?: UrgenciaWhereInput
    /**
     * Limit how many Urgencias to update.
     */
    limit?: number
  }

  /**
   * Urgencia upsert
   */
  export type UrgenciaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Urgencia
     */
    select?: UrgenciaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Urgencia
     */
    omit?: UrgenciaOmit<ExtArgs> | null
    /**
     * The filter to search for the Urgencia to update in case it exists.
     */
    where: UrgenciaWhereUniqueInput
    /**
     * In case the Urgencia found by the `where` argument doesn't exist, create a new Urgencia with this data.
     */
    create: XOR<UrgenciaCreateInput, UrgenciaUncheckedCreateInput>
    /**
     * In case the Urgencia was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UrgenciaUpdateInput, UrgenciaUncheckedUpdateInput>
  }

  /**
   * Urgencia delete
   */
  export type UrgenciaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Urgencia
     */
    select?: UrgenciaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Urgencia
     */
    omit?: UrgenciaOmit<ExtArgs> | null
    /**
     * Filter which Urgencia to delete.
     */
    where: UrgenciaWhereUniqueInput
  }

  /**
   * Urgencia deleteMany
   */
  export type UrgenciaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Urgencias to delete
     */
    where?: UrgenciaWhereInput
    /**
     * Limit how many Urgencias to delete.
     */
    limit?: number
  }

  /**
   * Urgencia findRaw
   */
  export type UrgenciaFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Urgencia aggregateRaw
   */
  export type UrgenciaAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Urgencia without action
   */
  export type UrgenciaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Urgencia
     */
    select?: UrgenciaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Urgencia
     */
    omit?: UrgenciaOmit<ExtArgs> | null
  }


  /**
   * Model Direitos
   */

  export type AggregateDireitos = {
    _count: DireitosCountAggregateOutputType | null
    _min: DireitosMinAggregateOutputType | null
    _max: DireitosMaxAggregateOutputType | null
  }

  export type DireitosMinAggregateOutputType = {
    id: string | null
    tipoDireito: string | null
    descricao: string | null
    comoSolicitar: string | null
    documentosNecessarios: string | null
    orgaoResponsavel: string | null
  }

  export type DireitosMaxAggregateOutputType = {
    id: string | null
    tipoDireito: string | null
    descricao: string | null
    comoSolicitar: string | null
    documentosNecessarios: string | null
    orgaoResponsavel: string | null
  }

  export type DireitosCountAggregateOutputType = {
    id: number
    tipoDireito: number
    descricao: number
    comoSolicitar: number
    documentosNecessarios: number
    orgaoResponsavel: number
    _all: number
  }


  export type DireitosMinAggregateInputType = {
    id?: true
    tipoDireito?: true
    descricao?: true
    comoSolicitar?: true
    documentosNecessarios?: true
    orgaoResponsavel?: true
  }

  export type DireitosMaxAggregateInputType = {
    id?: true
    tipoDireito?: true
    descricao?: true
    comoSolicitar?: true
    documentosNecessarios?: true
    orgaoResponsavel?: true
  }

  export type DireitosCountAggregateInputType = {
    id?: true
    tipoDireito?: true
    descricao?: true
    comoSolicitar?: true
    documentosNecessarios?: true
    orgaoResponsavel?: true
    _all?: true
  }

  export type DireitosAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Direitos to aggregate.
     */
    where?: DireitosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Direitos to fetch.
     */
    orderBy?: DireitosOrderByWithRelationInput | DireitosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DireitosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Direitos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Direitos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Direitos
    **/
    _count?: true | DireitosCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DireitosMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DireitosMaxAggregateInputType
  }

  export type GetDireitosAggregateType<T extends DireitosAggregateArgs> = {
        [P in keyof T & keyof AggregateDireitos]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDireitos[P]>
      : GetScalarType<T[P], AggregateDireitos[P]>
  }




  export type DireitosGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DireitosWhereInput
    orderBy?: DireitosOrderByWithAggregationInput | DireitosOrderByWithAggregationInput[]
    by: DireitosScalarFieldEnum[] | DireitosScalarFieldEnum
    having?: DireitosScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DireitosCountAggregateInputType | true
    _min?: DireitosMinAggregateInputType
    _max?: DireitosMaxAggregateInputType
  }

  export type DireitosGroupByOutputType = {
    id: string
    tipoDireito: string
    descricao: string
    comoSolicitar: string | null
    documentosNecessarios: string | null
    orgaoResponsavel: string
    _count: DireitosCountAggregateOutputType | null
    _min: DireitosMinAggregateOutputType | null
    _max: DireitosMaxAggregateOutputType | null
  }

  type GetDireitosGroupByPayload<T extends DireitosGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DireitosGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DireitosGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DireitosGroupByOutputType[P]>
            : GetScalarType<T[P], DireitosGroupByOutputType[P]>
        }
      >
    >


  export type DireitosSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tipoDireito?: boolean
    descricao?: boolean
    comoSolicitar?: boolean
    documentosNecessarios?: boolean
    orgaoResponsavel?: boolean
  }, ExtArgs["result"]["direitos"]>



  export type DireitosSelectScalar = {
    id?: boolean
    tipoDireito?: boolean
    descricao?: boolean
    comoSolicitar?: boolean
    documentosNecessarios?: boolean
    orgaoResponsavel?: boolean
  }

  export type DireitosOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tipoDireito" | "descricao" | "comoSolicitar" | "documentosNecessarios" | "orgaoResponsavel", ExtArgs["result"]["direitos"]>

  export type $DireitosPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Direitos"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tipoDireito: string
      descricao: string
      comoSolicitar: string | null
      documentosNecessarios: string | null
      orgaoResponsavel: string
    }, ExtArgs["result"]["direitos"]>
    composites: {}
  }

  type DireitosGetPayload<S extends boolean | null | undefined | DireitosDefaultArgs> = $Result.GetResult<Prisma.$DireitosPayload, S>

  type DireitosCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DireitosFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DireitosCountAggregateInputType | true
    }

  export interface DireitosDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Direitos'], meta: { name: 'Direitos' } }
    /**
     * Find zero or one Direitos that matches the filter.
     * @param {DireitosFindUniqueArgs} args - Arguments to find a Direitos
     * @example
     * // Get one Direitos
     * const direitos = await prisma.direitos.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DireitosFindUniqueArgs>(args: SelectSubset<T, DireitosFindUniqueArgs<ExtArgs>>): Prisma__DireitosClient<$Result.GetResult<Prisma.$DireitosPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Direitos that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DireitosFindUniqueOrThrowArgs} args - Arguments to find a Direitos
     * @example
     * // Get one Direitos
     * const direitos = await prisma.direitos.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DireitosFindUniqueOrThrowArgs>(args: SelectSubset<T, DireitosFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DireitosClient<$Result.GetResult<Prisma.$DireitosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Direitos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DireitosFindFirstArgs} args - Arguments to find a Direitos
     * @example
     * // Get one Direitos
     * const direitos = await prisma.direitos.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DireitosFindFirstArgs>(args?: SelectSubset<T, DireitosFindFirstArgs<ExtArgs>>): Prisma__DireitosClient<$Result.GetResult<Prisma.$DireitosPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Direitos that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DireitosFindFirstOrThrowArgs} args - Arguments to find a Direitos
     * @example
     * // Get one Direitos
     * const direitos = await prisma.direitos.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DireitosFindFirstOrThrowArgs>(args?: SelectSubset<T, DireitosFindFirstOrThrowArgs<ExtArgs>>): Prisma__DireitosClient<$Result.GetResult<Prisma.$DireitosPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Direitos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DireitosFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Direitos
     * const direitos = await prisma.direitos.findMany()
     * 
     * // Get first 10 Direitos
     * const direitos = await prisma.direitos.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const direitosWithIdOnly = await prisma.direitos.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DireitosFindManyArgs>(args?: SelectSubset<T, DireitosFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DireitosPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Direitos.
     * @param {DireitosCreateArgs} args - Arguments to create a Direitos.
     * @example
     * // Create one Direitos
     * const Direitos = await prisma.direitos.create({
     *   data: {
     *     // ... data to create a Direitos
     *   }
     * })
     * 
     */
    create<T extends DireitosCreateArgs>(args: SelectSubset<T, DireitosCreateArgs<ExtArgs>>): Prisma__DireitosClient<$Result.GetResult<Prisma.$DireitosPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Direitos.
     * @param {DireitosCreateManyArgs} args - Arguments to create many Direitos.
     * @example
     * // Create many Direitos
     * const direitos = await prisma.direitos.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DireitosCreateManyArgs>(args?: SelectSubset<T, DireitosCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Direitos.
     * @param {DireitosDeleteArgs} args - Arguments to delete one Direitos.
     * @example
     * // Delete one Direitos
     * const Direitos = await prisma.direitos.delete({
     *   where: {
     *     // ... filter to delete one Direitos
     *   }
     * })
     * 
     */
    delete<T extends DireitosDeleteArgs>(args: SelectSubset<T, DireitosDeleteArgs<ExtArgs>>): Prisma__DireitosClient<$Result.GetResult<Prisma.$DireitosPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Direitos.
     * @param {DireitosUpdateArgs} args - Arguments to update one Direitos.
     * @example
     * // Update one Direitos
     * const direitos = await prisma.direitos.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DireitosUpdateArgs>(args: SelectSubset<T, DireitosUpdateArgs<ExtArgs>>): Prisma__DireitosClient<$Result.GetResult<Prisma.$DireitosPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Direitos.
     * @param {DireitosDeleteManyArgs} args - Arguments to filter Direitos to delete.
     * @example
     * // Delete a few Direitos
     * const { count } = await prisma.direitos.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DireitosDeleteManyArgs>(args?: SelectSubset<T, DireitosDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Direitos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DireitosUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Direitos
     * const direitos = await prisma.direitos.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DireitosUpdateManyArgs>(args: SelectSubset<T, DireitosUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Direitos.
     * @param {DireitosUpsertArgs} args - Arguments to update or create a Direitos.
     * @example
     * // Update or create a Direitos
     * const direitos = await prisma.direitos.upsert({
     *   create: {
     *     // ... data to create a Direitos
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Direitos we want to update
     *   }
     * })
     */
    upsert<T extends DireitosUpsertArgs>(args: SelectSubset<T, DireitosUpsertArgs<ExtArgs>>): Prisma__DireitosClient<$Result.GetResult<Prisma.$DireitosPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Direitos that matches the filter.
     * @param {DireitosFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const direitos = await prisma.direitos.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: DireitosFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Direitos.
     * @param {DireitosAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const direitos = await prisma.direitos.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: DireitosAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Direitos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DireitosCountArgs} args - Arguments to filter Direitos to count.
     * @example
     * // Count the number of Direitos
     * const count = await prisma.direitos.count({
     *   where: {
     *     // ... the filter for the Direitos we want to count
     *   }
     * })
    **/
    count<T extends DireitosCountArgs>(
      args?: Subset<T, DireitosCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DireitosCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Direitos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DireitosAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DireitosAggregateArgs>(args: Subset<T, DireitosAggregateArgs>): Prisma.PrismaPromise<GetDireitosAggregateType<T>>

    /**
     * Group by Direitos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DireitosGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DireitosGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DireitosGroupByArgs['orderBy'] }
        : { orderBy?: DireitosGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DireitosGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDireitosGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Direitos model
   */
  readonly fields: DireitosFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Direitos.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DireitosClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Direitos model
   */
  interface DireitosFieldRefs {
    readonly id: FieldRef<"Direitos", 'String'>
    readonly tipoDireito: FieldRef<"Direitos", 'String'>
    readonly descricao: FieldRef<"Direitos", 'String'>
    readonly comoSolicitar: FieldRef<"Direitos", 'String'>
    readonly documentosNecessarios: FieldRef<"Direitos", 'String'>
    readonly orgaoResponsavel: FieldRef<"Direitos", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Direitos findUnique
   */
  export type DireitosFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Direitos
     */
    select?: DireitosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Direitos
     */
    omit?: DireitosOmit<ExtArgs> | null
    /**
     * Filter, which Direitos to fetch.
     */
    where: DireitosWhereUniqueInput
  }

  /**
   * Direitos findUniqueOrThrow
   */
  export type DireitosFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Direitos
     */
    select?: DireitosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Direitos
     */
    omit?: DireitosOmit<ExtArgs> | null
    /**
     * Filter, which Direitos to fetch.
     */
    where: DireitosWhereUniqueInput
  }

  /**
   * Direitos findFirst
   */
  export type DireitosFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Direitos
     */
    select?: DireitosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Direitos
     */
    omit?: DireitosOmit<ExtArgs> | null
    /**
     * Filter, which Direitos to fetch.
     */
    where?: DireitosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Direitos to fetch.
     */
    orderBy?: DireitosOrderByWithRelationInput | DireitosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Direitos.
     */
    cursor?: DireitosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Direitos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Direitos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Direitos.
     */
    distinct?: DireitosScalarFieldEnum | DireitosScalarFieldEnum[]
  }

  /**
   * Direitos findFirstOrThrow
   */
  export type DireitosFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Direitos
     */
    select?: DireitosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Direitos
     */
    omit?: DireitosOmit<ExtArgs> | null
    /**
     * Filter, which Direitos to fetch.
     */
    where?: DireitosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Direitos to fetch.
     */
    orderBy?: DireitosOrderByWithRelationInput | DireitosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Direitos.
     */
    cursor?: DireitosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Direitos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Direitos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Direitos.
     */
    distinct?: DireitosScalarFieldEnum | DireitosScalarFieldEnum[]
  }

  /**
   * Direitos findMany
   */
  export type DireitosFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Direitos
     */
    select?: DireitosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Direitos
     */
    omit?: DireitosOmit<ExtArgs> | null
    /**
     * Filter, which Direitos to fetch.
     */
    where?: DireitosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Direitos to fetch.
     */
    orderBy?: DireitosOrderByWithRelationInput | DireitosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Direitos.
     */
    cursor?: DireitosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Direitos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Direitos.
     */
    skip?: number
    distinct?: DireitosScalarFieldEnum | DireitosScalarFieldEnum[]
  }

  /**
   * Direitos create
   */
  export type DireitosCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Direitos
     */
    select?: DireitosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Direitos
     */
    omit?: DireitosOmit<ExtArgs> | null
    /**
     * The data needed to create a Direitos.
     */
    data: XOR<DireitosCreateInput, DireitosUncheckedCreateInput>
  }

  /**
   * Direitos createMany
   */
  export type DireitosCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Direitos.
     */
    data: DireitosCreateManyInput | DireitosCreateManyInput[]
  }

  /**
   * Direitos update
   */
  export type DireitosUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Direitos
     */
    select?: DireitosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Direitos
     */
    omit?: DireitosOmit<ExtArgs> | null
    /**
     * The data needed to update a Direitos.
     */
    data: XOR<DireitosUpdateInput, DireitosUncheckedUpdateInput>
    /**
     * Choose, which Direitos to update.
     */
    where: DireitosWhereUniqueInput
  }

  /**
   * Direitos updateMany
   */
  export type DireitosUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Direitos.
     */
    data: XOR<DireitosUpdateManyMutationInput, DireitosUncheckedUpdateManyInput>
    /**
     * Filter which Direitos to update
     */
    where?: DireitosWhereInput
    /**
     * Limit how many Direitos to update.
     */
    limit?: number
  }

  /**
   * Direitos upsert
   */
  export type DireitosUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Direitos
     */
    select?: DireitosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Direitos
     */
    omit?: DireitosOmit<ExtArgs> | null
    /**
     * The filter to search for the Direitos to update in case it exists.
     */
    where: DireitosWhereUniqueInput
    /**
     * In case the Direitos found by the `where` argument doesn't exist, create a new Direitos with this data.
     */
    create: XOR<DireitosCreateInput, DireitosUncheckedCreateInput>
    /**
     * In case the Direitos was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DireitosUpdateInput, DireitosUncheckedUpdateInput>
  }

  /**
   * Direitos delete
   */
  export type DireitosDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Direitos
     */
    select?: DireitosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Direitos
     */
    omit?: DireitosOmit<ExtArgs> | null
    /**
     * Filter which Direitos to delete.
     */
    where: DireitosWhereUniqueInput
  }

  /**
   * Direitos deleteMany
   */
  export type DireitosDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Direitos to delete
     */
    where?: DireitosWhereInput
    /**
     * Limit how many Direitos to delete.
     */
    limit?: number
  }

  /**
   * Direitos findRaw
   */
  export type DireitosFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Direitos aggregateRaw
   */
  export type DireitosAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Direitos without action
   */
  export type DireitosDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Direitos
     */
    select?: DireitosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Direitos
     */
    omit?: DireitosOmit<ExtArgs> | null
  }


  /**
   * Model OrgaoPublico
   */

  export type AggregateOrgaoPublico = {
    _count: OrgaoPublicoCountAggregateOutputType | null
    _avg: OrgaoPublicoAvgAggregateOutputType | null
    _sum: OrgaoPublicoSumAggregateOutputType | null
    _min: OrgaoPublicoMinAggregateOutputType | null
    _max: OrgaoPublicoMaxAggregateOutputType | null
  }

  export type OrgaoPublicoAvgAggregateOutputType = {
    totalConjuntosDados: number | null
    totalSeguidores: number | null
  }

  export type OrgaoPublicoSumAggregateOutputType = {
    totalConjuntosDados: number | null
    totalSeguidores: number | null
  }

  export type OrgaoPublicoMinAggregateOutputType = {
    id: string | null
    nome: string | null
    titulo: string | null
    descricao: string | null
    urlImagem: string | null
    esfera: string | null
    uf: string | null
    municipio: string | null
    totalConjuntosDados: number | null
    totalSeguidores: number | null
    dataCriacao: Date | null
    ultimaAtualizacao: Date | null
  }

  export type OrgaoPublicoMaxAggregateOutputType = {
    id: string | null
    nome: string | null
    titulo: string | null
    descricao: string | null
    urlImagem: string | null
    esfera: string | null
    uf: string | null
    municipio: string | null
    totalConjuntosDados: number | null
    totalSeguidores: number | null
    dataCriacao: Date | null
    ultimaAtualizacao: Date | null
  }

  export type OrgaoPublicoCountAggregateOutputType = {
    id: number
    nome: number
    titulo: number
    descricao: number
    urlImagem: number
    esfera: number
    uf: number
    municipio: number
    totalConjuntosDados: number
    totalSeguidores: number
    dataCriacao: number
    ultimaAtualizacao: number
    _all: number
  }


  export type OrgaoPublicoAvgAggregateInputType = {
    totalConjuntosDados?: true
    totalSeguidores?: true
  }

  export type OrgaoPublicoSumAggregateInputType = {
    totalConjuntosDados?: true
    totalSeguidores?: true
  }

  export type OrgaoPublicoMinAggregateInputType = {
    id?: true
    nome?: true
    titulo?: true
    descricao?: true
    urlImagem?: true
    esfera?: true
    uf?: true
    municipio?: true
    totalConjuntosDados?: true
    totalSeguidores?: true
    dataCriacao?: true
    ultimaAtualizacao?: true
  }

  export type OrgaoPublicoMaxAggregateInputType = {
    id?: true
    nome?: true
    titulo?: true
    descricao?: true
    urlImagem?: true
    esfera?: true
    uf?: true
    municipio?: true
    totalConjuntosDados?: true
    totalSeguidores?: true
    dataCriacao?: true
    ultimaAtualizacao?: true
  }

  export type OrgaoPublicoCountAggregateInputType = {
    id?: true
    nome?: true
    titulo?: true
    descricao?: true
    urlImagem?: true
    esfera?: true
    uf?: true
    municipio?: true
    totalConjuntosDados?: true
    totalSeguidores?: true
    dataCriacao?: true
    ultimaAtualizacao?: true
    _all?: true
  }

  export type OrgaoPublicoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OrgaoPublico to aggregate.
     */
    where?: OrgaoPublicoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrgaoPublicos to fetch.
     */
    orderBy?: OrgaoPublicoOrderByWithRelationInput | OrgaoPublicoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrgaoPublicoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrgaoPublicos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrgaoPublicos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OrgaoPublicos
    **/
    _count?: true | OrgaoPublicoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OrgaoPublicoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OrgaoPublicoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrgaoPublicoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrgaoPublicoMaxAggregateInputType
  }

  export type GetOrgaoPublicoAggregateType<T extends OrgaoPublicoAggregateArgs> = {
        [P in keyof T & keyof AggregateOrgaoPublico]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrgaoPublico[P]>
      : GetScalarType<T[P], AggregateOrgaoPublico[P]>
  }




  export type OrgaoPublicoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrgaoPublicoWhereInput
    orderBy?: OrgaoPublicoOrderByWithAggregationInput | OrgaoPublicoOrderByWithAggregationInput[]
    by: OrgaoPublicoScalarFieldEnum[] | OrgaoPublicoScalarFieldEnum
    having?: OrgaoPublicoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrgaoPublicoCountAggregateInputType | true
    _avg?: OrgaoPublicoAvgAggregateInputType
    _sum?: OrgaoPublicoSumAggregateInputType
    _min?: OrgaoPublicoMinAggregateInputType
    _max?: OrgaoPublicoMaxAggregateInputType
  }

  export type OrgaoPublicoGroupByOutputType = {
    id: string
    nome: string
    titulo: string
    descricao: string | null
    urlImagem: string | null
    esfera: string
    uf: string | null
    municipio: string | null
    totalConjuntosDados: number
    totalSeguidores: number
    dataCriacao: Date
    ultimaAtualizacao: Date | null
    _count: OrgaoPublicoCountAggregateOutputType | null
    _avg: OrgaoPublicoAvgAggregateOutputType | null
    _sum: OrgaoPublicoSumAggregateOutputType | null
    _min: OrgaoPublicoMinAggregateOutputType | null
    _max: OrgaoPublicoMaxAggregateOutputType | null
  }

  type GetOrgaoPublicoGroupByPayload<T extends OrgaoPublicoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrgaoPublicoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrgaoPublicoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrgaoPublicoGroupByOutputType[P]>
            : GetScalarType<T[P], OrgaoPublicoGroupByOutputType[P]>
        }
      >
    >


  export type OrgaoPublicoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    titulo?: boolean
    descricao?: boolean
    urlImagem?: boolean
    esfera?: boolean
    uf?: boolean
    municipio?: boolean
    totalConjuntosDados?: boolean
    totalSeguidores?: boolean
    dataCriacao?: boolean
    ultimaAtualizacao?: boolean
  }, ExtArgs["result"]["orgaoPublico"]>



  export type OrgaoPublicoSelectScalar = {
    id?: boolean
    nome?: boolean
    titulo?: boolean
    descricao?: boolean
    urlImagem?: boolean
    esfera?: boolean
    uf?: boolean
    municipio?: boolean
    totalConjuntosDados?: boolean
    totalSeguidores?: boolean
    dataCriacao?: boolean
    ultimaAtualizacao?: boolean
  }

  export type OrgaoPublicoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nome" | "titulo" | "descricao" | "urlImagem" | "esfera" | "uf" | "municipio" | "totalConjuntosDados" | "totalSeguidores" | "dataCriacao" | "ultimaAtualizacao", ExtArgs["result"]["orgaoPublico"]>

  export type $OrgaoPublicoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OrgaoPublico"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nome: string
      titulo: string
      descricao: string | null
      urlImagem: string | null
      esfera: string
      uf: string | null
      municipio: string | null
      totalConjuntosDados: number
      totalSeguidores: number
      dataCriacao: Date
      ultimaAtualizacao: Date | null
    }, ExtArgs["result"]["orgaoPublico"]>
    composites: {}
  }

  type OrgaoPublicoGetPayload<S extends boolean | null | undefined | OrgaoPublicoDefaultArgs> = $Result.GetResult<Prisma.$OrgaoPublicoPayload, S>

  type OrgaoPublicoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OrgaoPublicoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OrgaoPublicoCountAggregateInputType | true
    }

  export interface OrgaoPublicoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OrgaoPublico'], meta: { name: 'OrgaoPublico' } }
    /**
     * Find zero or one OrgaoPublico that matches the filter.
     * @param {OrgaoPublicoFindUniqueArgs} args - Arguments to find a OrgaoPublico
     * @example
     * // Get one OrgaoPublico
     * const orgaoPublico = await prisma.orgaoPublico.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrgaoPublicoFindUniqueArgs>(args: SelectSubset<T, OrgaoPublicoFindUniqueArgs<ExtArgs>>): Prisma__OrgaoPublicoClient<$Result.GetResult<Prisma.$OrgaoPublicoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one OrgaoPublico that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OrgaoPublicoFindUniqueOrThrowArgs} args - Arguments to find a OrgaoPublico
     * @example
     * // Get one OrgaoPublico
     * const orgaoPublico = await prisma.orgaoPublico.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrgaoPublicoFindUniqueOrThrowArgs>(args: SelectSubset<T, OrgaoPublicoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OrgaoPublicoClient<$Result.GetResult<Prisma.$OrgaoPublicoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OrgaoPublico that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrgaoPublicoFindFirstArgs} args - Arguments to find a OrgaoPublico
     * @example
     * // Get one OrgaoPublico
     * const orgaoPublico = await prisma.orgaoPublico.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrgaoPublicoFindFirstArgs>(args?: SelectSubset<T, OrgaoPublicoFindFirstArgs<ExtArgs>>): Prisma__OrgaoPublicoClient<$Result.GetResult<Prisma.$OrgaoPublicoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OrgaoPublico that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrgaoPublicoFindFirstOrThrowArgs} args - Arguments to find a OrgaoPublico
     * @example
     * // Get one OrgaoPublico
     * const orgaoPublico = await prisma.orgaoPublico.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrgaoPublicoFindFirstOrThrowArgs>(args?: SelectSubset<T, OrgaoPublicoFindFirstOrThrowArgs<ExtArgs>>): Prisma__OrgaoPublicoClient<$Result.GetResult<Prisma.$OrgaoPublicoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more OrgaoPublicos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrgaoPublicoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OrgaoPublicos
     * const orgaoPublicos = await prisma.orgaoPublico.findMany()
     * 
     * // Get first 10 OrgaoPublicos
     * const orgaoPublicos = await prisma.orgaoPublico.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const orgaoPublicoWithIdOnly = await prisma.orgaoPublico.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OrgaoPublicoFindManyArgs>(args?: SelectSubset<T, OrgaoPublicoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrgaoPublicoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a OrgaoPublico.
     * @param {OrgaoPublicoCreateArgs} args - Arguments to create a OrgaoPublico.
     * @example
     * // Create one OrgaoPublico
     * const OrgaoPublico = await prisma.orgaoPublico.create({
     *   data: {
     *     // ... data to create a OrgaoPublico
     *   }
     * })
     * 
     */
    create<T extends OrgaoPublicoCreateArgs>(args: SelectSubset<T, OrgaoPublicoCreateArgs<ExtArgs>>): Prisma__OrgaoPublicoClient<$Result.GetResult<Prisma.$OrgaoPublicoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many OrgaoPublicos.
     * @param {OrgaoPublicoCreateManyArgs} args - Arguments to create many OrgaoPublicos.
     * @example
     * // Create many OrgaoPublicos
     * const orgaoPublico = await prisma.orgaoPublico.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OrgaoPublicoCreateManyArgs>(args?: SelectSubset<T, OrgaoPublicoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a OrgaoPublico.
     * @param {OrgaoPublicoDeleteArgs} args - Arguments to delete one OrgaoPublico.
     * @example
     * // Delete one OrgaoPublico
     * const OrgaoPublico = await prisma.orgaoPublico.delete({
     *   where: {
     *     // ... filter to delete one OrgaoPublico
     *   }
     * })
     * 
     */
    delete<T extends OrgaoPublicoDeleteArgs>(args: SelectSubset<T, OrgaoPublicoDeleteArgs<ExtArgs>>): Prisma__OrgaoPublicoClient<$Result.GetResult<Prisma.$OrgaoPublicoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one OrgaoPublico.
     * @param {OrgaoPublicoUpdateArgs} args - Arguments to update one OrgaoPublico.
     * @example
     * // Update one OrgaoPublico
     * const orgaoPublico = await prisma.orgaoPublico.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OrgaoPublicoUpdateArgs>(args: SelectSubset<T, OrgaoPublicoUpdateArgs<ExtArgs>>): Prisma__OrgaoPublicoClient<$Result.GetResult<Prisma.$OrgaoPublicoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more OrgaoPublicos.
     * @param {OrgaoPublicoDeleteManyArgs} args - Arguments to filter OrgaoPublicos to delete.
     * @example
     * // Delete a few OrgaoPublicos
     * const { count } = await prisma.orgaoPublico.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OrgaoPublicoDeleteManyArgs>(args?: SelectSubset<T, OrgaoPublicoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OrgaoPublicos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrgaoPublicoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OrgaoPublicos
     * const orgaoPublico = await prisma.orgaoPublico.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OrgaoPublicoUpdateManyArgs>(args: SelectSubset<T, OrgaoPublicoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one OrgaoPublico.
     * @param {OrgaoPublicoUpsertArgs} args - Arguments to update or create a OrgaoPublico.
     * @example
     * // Update or create a OrgaoPublico
     * const orgaoPublico = await prisma.orgaoPublico.upsert({
     *   create: {
     *     // ... data to create a OrgaoPublico
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OrgaoPublico we want to update
     *   }
     * })
     */
    upsert<T extends OrgaoPublicoUpsertArgs>(args: SelectSubset<T, OrgaoPublicoUpsertArgs<ExtArgs>>): Prisma__OrgaoPublicoClient<$Result.GetResult<Prisma.$OrgaoPublicoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more OrgaoPublicos that matches the filter.
     * @param {OrgaoPublicoFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const orgaoPublico = await prisma.orgaoPublico.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: OrgaoPublicoFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a OrgaoPublico.
     * @param {OrgaoPublicoAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const orgaoPublico = await prisma.orgaoPublico.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: OrgaoPublicoAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of OrgaoPublicos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrgaoPublicoCountArgs} args - Arguments to filter OrgaoPublicos to count.
     * @example
     * // Count the number of OrgaoPublicos
     * const count = await prisma.orgaoPublico.count({
     *   where: {
     *     // ... the filter for the OrgaoPublicos we want to count
     *   }
     * })
    **/
    count<T extends OrgaoPublicoCountArgs>(
      args?: Subset<T, OrgaoPublicoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrgaoPublicoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OrgaoPublico.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrgaoPublicoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OrgaoPublicoAggregateArgs>(args: Subset<T, OrgaoPublicoAggregateArgs>): Prisma.PrismaPromise<GetOrgaoPublicoAggregateType<T>>

    /**
     * Group by OrgaoPublico.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrgaoPublicoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OrgaoPublicoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrgaoPublicoGroupByArgs['orderBy'] }
        : { orderBy?: OrgaoPublicoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OrgaoPublicoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrgaoPublicoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OrgaoPublico model
   */
  readonly fields: OrgaoPublicoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OrgaoPublico.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrgaoPublicoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the OrgaoPublico model
   */
  interface OrgaoPublicoFieldRefs {
    readonly id: FieldRef<"OrgaoPublico", 'String'>
    readonly nome: FieldRef<"OrgaoPublico", 'String'>
    readonly titulo: FieldRef<"OrgaoPublico", 'String'>
    readonly descricao: FieldRef<"OrgaoPublico", 'String'>
    readonly urlImagem: FieldRef<"OrgaoPublico", 'String'>
    readonly esfera: FieldRef<"OrgaoPublico", 'String'>
    readonly uf: FieldRef<"OrgaoPublico", 'String'>
    readonly municipio: FieldRef<"OrgaoPublico", 'String'>
    readonly totalConjuntosDados: FieldRef<"OrgaoPublico", 'Int'>
    readonly totalSeguidores: FieldRef<"OrgaoPublico", 'Int'>
    readonly dataCriacao: FieldRef<"OrgaoPublico", 'DateTime'>
    readonly ultimaAtualizacao: FieldRef<"OrgaoPublico", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * OrgaoPublico findUnique
   */
  export type OrgaoPublicoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrgaoPublico
     */
    select?: OrgaoPublicoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrgaoPublico
     */
    omit?: OrgaoPublicoOmit<ExtArgs> | null
    /**
     * Filter, which OrgaoPublico to fetch.
     */
    where: OrgaoPublicoWhereUniqueInput
  }

  /**
   * OrgaoPublico findUniqueOrThrow
   */
  export type OrgaoPublicoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrgaoPublico
     */
    select?: OrgaoPublicoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrgaoPublico
     */
    omit?: OrgaoPublicoOmit<ExtArgs> | null
    /**
     * Filter, which OrgaoPublico to fetch.
     */
    where: OrgaoPublicoWhereUniqueInput
  }

  /**
   * OrgaoPublico findFirst
   */
  export type OrgaoPublicoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrgaoPublico
     */
    select?: OrgaoPublicoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrgaoPublico
     */
    omit?: OrgaoPublicoOmit<ExtArgs> | null
    /**
     * Filter, which OrgaoPublico to fetch.
     */
    where?: OrgaoPublicoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrgaoPublicos to fetch.
     */
    orderBy?: OrgaoPublicoOrderByWithRelationInput | OrgaoPublicoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OrgaoPublicos.
     */
    cursor?: OrgaoPublicoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrgaoPublicos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrgaoPublicos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrgaoPublicos.
     */
    distinct?: OrgaoPublicoScalarFieldEnum | OrgaoPublicoScalarFieldEnum[]
  }

  /**
   * OrgaoPublico findFirstOrThrow
   */
  export type OrgaoPublicoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrgaoPublico
     */
    select?: OrgaoPublicoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrgaoPublico
     */
    omit?: OrgaoPublicoOmit<ExtArgs> | null
    /**
     * Filter, which OrgaoPublico to fetch.
     */
    where?: OrgaoPublicoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrgaoPublicos to fetch.
     */
    orderBy?: OrgaoPublicoOrderByWithRelationInput | OrgaoPublicoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OrgaoPublicos.
     */
    cursor?: OrgaoPublicoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrgaoPublicos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrgaoPublicos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrgaoPublicos.
     */
    distinct?: OrgaoPublicoScalarFieldEnum | OrgaoPublicoScalarFieldEnum[]
  }

  /**
   * OrgaoPublico findMany
   */
  export type OrgaoPublicoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrgaoPublico
     */
    select?: OrgaoPublicoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrgaoPublico
     */
    omit?: OrgaoPublicoOmit<ExtArgs> | null
    /**
     * Filter, which OrgaoPublicos to fetch.
     */
    where?: OrgaoPublicoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrgaoPublicos to fetch.
     */
    orderBy?: OrgaoPublicoOrderByWithRelationInput | OrgaoPublicoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OrgaoPublicos.
     */
    cursor?: OrgaoPublicoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrgaoPublicos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrgaoPublicos.
     */
    skip?: number
    distinct?: OrgaoPublicoScalarFieldEnum | OrgaoPublicoScalarFieldEnum[]
  }

  /**
   * OrgaoPublico create
   */
  export type OrgaoPublicoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrgaoPublico
     */
    select?: OrgaoPublicoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrgaoPublico
     */
    omit?: OrgaoPublicoOmit<ExtArgs> | null
    /**
     * The data needed to create a OrgaoPublico.
     */
    data: XOR<OrgaoPublicoCreateInput, OrgaoPublicoUncheckedCreateInput>
  }

  /**
   * OrgaoPublico createMany
   */
  export type OrgaoPublicoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OrgaoPublicos.
     */
    data: OrgaoPublicoCreateManyInput | OrgaoPublicoCreateManyInput[]
  }

  /**
   * OrgaoPublico update
   */
  export type OrgaoPublicoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrgaoPublico
     */
    select?: OrgaoPublicoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrgaoPublico
     */
    omit?: OrgaoPublicoOmit<ExtArgs> | null
    /**
     * The data needed to update a OrgaoPublico.
     */
    data: XOR<OrgaoPublicoUpdateInput, OrgaoPublicoUncheckedUpdateInput>
    /**
     * Choose, which OrgaoPublico to update.
     */
    where: OrgaoPublicoWhereUniqueInput
  }

  /**
   * OrgaoPublico updateMany
   */
  export type OrgaoPublicoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OrgaoPublicos.
     */
    data: XOR<OrgaoPublicoUpdateManyMutationInput, OrgaoPublicoUncheckedUpdateManyInput>
    /**
     * Filter which OrgaoPublicos to update
     */
    where?: OrgaoPublicoWhereInput
    /**
     * Limit how many OrgaoPublicos to update.
     */
    limit?: number
  }

  /**
   * OrgaoPublico upsert
   */
  export type OrgaoPublicoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrgaoPublico
     */
    select?: OrgaoPublicoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrgaoPublico
     */
    omit?: OrgaoPublicoOmit<ExtArgs> | null
    /**
     * The filter to search for the OrgaoPublico to update in case it exists.
     */
    where: OrgaoPublicoWhereUniqueInput
    /**
     * In case the OrgaoPublico found by the `where` argument doesn't exist, create a new OrgaoPublico with this data.
     */
    create: XOR<OrgaoPublicoCreateInput, OrgaoPublicoUncheckedCreateInput>
    /**
     * In case the OrgaoPublico was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrgaoPublicoUpdateInput, OrgaoPublicoUncheckedUpdateInput>
  }

  /**
   * OrgaoPublico delete
   */
  export type OrgaoPublicoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrgaoPublico
     */
    select?: OrgaoPublicoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrgaoPublico
     */
    omit?: OrgaoPublicoOmit<ExtArgs> | null
    /**
     * Filter which OrgaoPublico to delete.
     */
    where: OrgaoPublicoWhereUniqueInput
  }

  /**
   * OrgaoPublico deleteMany
   */
  export type OrgaoPublicoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OrgaoPublicos to delete
     */
    where?: OrgaoPublicoWhereInput
    /**
     * Limit how many OrgaoPublicos to delete.
     */
    limit?: number
  }

  /**
   * OrgaoPublico findRaw
   */
  export type OrgaoPublicoFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * OrgaoPublico aggregateRaw
   */
  export type OrgaoPublicoAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * OrgaoPublico without action
   */
  export type OrgaoPublicoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrgaoPublico
     */
    select?: OrgaoPublicoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrgaoPublico
     */
    omit?: OrgaoPublicoOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const SaudeScalarFieldEnum: {
    id: 'id',
    nomeServico: 'nomeServico',
    descricao: 'descricao',
    orgaoResponsavel: 'orgaoResponsavel',
    contato: 'contato',
    localizacao: 'localizacao',
    horarios: 'horarios'
  };

  export type SaudeScalarFieldEnum = (typeof SaudeScalarFieldEnum)[keyof typeof SaudeScalarFieldEnum]


  export const CulturaLazerScalarFieldEnum: {
    id: 'id',
    evento: 'evento',
    local: 'local',
    data: 'data',
    horario: 'horario',
    organizador: 'organizador',
    tipo: 'tipo'
  };

  export type CulturaLazerScalarFieldEnum = (typeof CulturaLazerScalarFieldEnum)[keyof typeof CulturaLazerScalarFieldEnum]


  export const EducacaoScalarFieldEnum: {
    id: 'id',
    nomeInstituicao: 'nomeInstituicao',
    tipoInstituicao: 'tipoInstituicao',
    endereco: 'endereco',
    contato: 'contato',
    orgaoResponsavel: 'orgaoResponsavel'
  };

  export type EducacaoScalarFieldEnum = (typeof EducacaoScalarFieldEnum)[keyof typeof EducacaoScalarFieldEnum]


  export const UrgenciaScalarFieldEnum: {
    id: 'id',
    tipoServico: 'tipoServico',
    contato: 'contato',
    localizacao: 'localizacao',
    descricao: 'descricao',
    disponibilidade: 'disponibilidade'
  };

  export type UrgenciaScalarFieldEnum = (typeof UrgenciaScalarFieldEnum)[keyof typeof UrgenciaScalarFieldEnum]


  export const DireitosScalarFieldEnum: {
    id: 'id',
    tipoDireito: 'tipoDireito',
    descricao: 'descricao',
    comoSolicitar: 'comoSolicitar',
    documentosNecessarios: 'documentosNecessarios',
    orgaoResponsavel: 'orgaoResponsavel'
  };

  export type DireitosScalarFieldEnum = (typeof DireitosScalarFieldEnum)[keyof typeof DireitosScalarFieldEnum]


  export const OrgaoPublicoScalarFieldEnum: {
    id: 'id',
    nome: 'nome',
    titulo: 'titulo',
    descricao: 'descricao',
    urlImagem: 'urlImagem',
    esfera: 'esfera',
    uf: 'uf',
    municipio: 'municipio',
    totalConjuntosDados: 'totalConjuntosDados',
    totalSeguidores: 'totalSeguidores',
    dataCriacao: 'dataCriacao',
    ultimaAtualizacao: 'ultimaAtualizacao'
  };

  export type OrgaoPublicoScalarFieldEnum = (typeof OrgaoPublicoScalarFieldEnum)[keyof typeof OrgaoPublicoScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type SaudeWhereInput = {
    AND?: SaudeWhereInput | SaudeWhereInput[]
    OR?: SaudeWhereInput[]
    NOT?: SaudeWhereInput | SaudeWhereInput[]
    id?: StringFilter<"Saude"> | string
    nomeServico?: StringFilter<"Saude"> | string
    descricao?: StringFilter<"Saude"> | string
    orgaoResponsavel?: StringFilter<"Saude"> | string
    contato?: StringNullableFilter<"Saude"> | string | null
    localizacao?: StringNullableFilter<"Saude"> | string | null
    horarios?: StringNullableFilter<"Saude"> | string | null
  }

  export type SaudeOrderByWithRelationInput = {
    id?: SortOrder
    nomeServico?: SortOrder
    descricao?: SortOrder
    orgaoResponsavel?: SortOrder
    contato?: SortOrder
    localizacao?: SortOrder
    horarios?: SortOrder
  }

  export type SaudeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SaudeWhereInput | SaudeWhereInput[]
    OR?: SaudeWhereInput[]
    NOT?: SaudeWhereInput | SaudeWhereInput[]
    nomeServico?: StringFilter<"Saude"> | string
    descricao?: StringFilter<"Saude"> | string
    orgaoResponsavel?: StringFilter<"Saude"> | string
    contato?: StringNullableFilter<"Saude"> | string | null
    localizacao?: StringNullableFilter<"Saude"> | string | null
    horarios?: StringNullableFilter<"Saude"> | string | null
  }, "id">

  export type SaudeOrderByWithAggregationInput = {
    id?: SortOrder
    nomeServico?: SortOrder
    descricao?: SortOrder
    orgaoResponsavel?: SortOrder
    contato?: SortOrder
    localizacao?: SortOrder
    horarios?: SortOrder
    _count?: SaudeCountOrderByAggregateInput
    _max?: SaudeMaxOrderByAggregateInput
    _min?: SaudeMinOrderByAggregateInput
  }

  export type SaudeScalarWhereWithAggregatesInput = {
    AND?: SaudeScalarWhereWithAggregatesInput | SaudeScalarWhereWithAggregatesInput[]
    OR?: SaudeScalarWhereWithAggregatesInput[]
    NOT?: SaudeScalarWhereWithAggregatesInput | SaudeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Saude"> | string
    nomeServico?: StringWithAggregatesFilter<"Saude"> | string
    descricao?: StringWithAggregatesFilter<"Saude"> | string
    orgaoResponsavel?: StringWithAggregatesFilter<"Saude"> | string
    contato?: StringNullableWithAggregatesFilter<"Saude"> | string | null
    localizacao?: StringNullableWithAggregatesFilter<"Saude"> | string | null
    horarios?: StringNullableWithAggregatesFilter<"Saude"> | string | null
  }

  export type CulturaLazerWhereInput = {
    AND?: CulturaLazerWhereInput | CulturaLazerWhereInput[]
    OR?: CulturaLazerWhereInput[]
    NOT?: CulturaLazerWhereInput | CulturaLazerWhereInput[]
    id?: StringFilter<"CulturaLazer"> | string
    evento?: StringFilter<"CulturaLazer"> | string
    local?: StringFilter<"CulturaLazer"> | string
    data?: StringFilter<"CulturaLazer"> | string
    horario?: StringFilter<"CulturaLazer"> | string
    organizador?: StringFilter<"CulturaLazer"> | string
    tipo?: StringNullableFilter<"CulturaLazer"> | string | null
  }

  export type CulturaLazerOrderByWithRelationInput = {
    id?: SortOrder
    evento?: SortOrder
    local?: SortOrder
    data?: SortOrder
    horario?: SortOrder
    organizador?: SortOrder
    tipo?: SortOrder
  }

  export type CulturaLazerWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CulturaLazerWhereInput | CulturaLazerWhereInput[]
    OR?: CulturaLazerWhereInput[]
    NOT?: CulturaLazerWhereInput | CulturaLazerWhereInput[]
    evento?: StringFilter<"CulturaLazer"> | string
    local?: StringFilter<"CulturaLazer"> | string
    data?: StringFilter<"CulturaLazer"> | string
    horario?: StringFilter<"CulturaLazer"> | string
    organizador?: StringFilter<"CulturaLazer"> | string
    tipo?: StringNullableFilter<"CulturaLazer"> | string | null
  }, "id">

  export type CulturaLazerOrderByWithAggregationInput = {
    id?: SortOrder
    evento?: SortOrder
    local?: SortOrder
    data?: SortOrder
    horario?: SortOrder
    organizador?: SortOrder
    tipo?: SortOrder
    _count?: CulturaLazerCountOrderByAggregateInput
    _max?: CulturaLazerMaxOrderByAggregateInput
    _min?: CulturaLazerMinOrderByAggregateInput
  }

  export type CulturaLazerScalarWhereWithAggregatesInput = {
    AND?: CulturaLazerScalarWhereWithAggregatesInput | CulturaLazerScalarWhereWithAggregatesInput[]
    OR?: CulturaLazerScalarWhereWithAggregatesInput[]
    NOT?: CulturaLazerScalarWhereWithAggregatesInput | CulturaLazerScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CulturaLazer"> | string
    evento?: StringWithAggregatesFilter<"CulturaLazer"> | string
    local?: StringWithAggregatesFilter<"CulturaLazer"> | string
    data?: StringWithAggregatesFilter<"CulturaLazer"> | string
    horario?: StringWithAggregatesFilter<"CulturaLazer"> | string
    organizador?: StringWithAggregatesFilter<"CulturaLazer"> | string
    tipo?: StringNullableWithAggregatesFilter<"CulturaLazer"> | string | null
  }

  export type EducacaoWhereInput = {
    AND?: EducacaoWhereInput | EducacaoWhereInput[]
    OR?: EducacaoWhereInput[]
    NOT?: EducacaoWhereInput | EducacaoWhereInput[]
    id?: StringFilter<"Educacao"> | string
    nomeInstituicao?: StringFilter<"Educacao"> | string
    tipoInstituicao?: StringFilter<"Educacao"> | string
    endereco?: StringFilter<"Educacao"> | string
    contato?: StringNullableFilter<"Educacao"> | string | null
    orgaoResponsavel?: StringFilter<"Educacao"> | string
  }

  export type EducacaoOrderByWithRelationInput = {
    id?: SortOrder
    nomeInstituicao?: SortOrder
    tipoInstituicao?: SortOrder
    endereco?: SortOrder
    contato?: SortOrder
    orgaoResponsavel?: SortOrder
  }

  export type EducacaoWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: EducacaoWhereInput | EducacaoWhereInput[]
    OR?: EducacaoWhereInput[]
    NOT?: EducacaoWhereInput | EducacaoWhereInput[]
    nomeInstituicao?: StringFilter<"Educacao"> | string
    tipoInstituicao?: StringFilter<"Educacao"> | string
    endereco?: StringFilter<"Educacao"> | string
    contato?: StringNullableFilter<"Educacao"> | string | null
    orgaoResponsavel?: StringFilter<"Educacao"> | string
  }, "id">

  export type EducacaoOrderByWithAggregationInput = {
    id?: SortOrder
    nomeInstituicao?: SortOrder
    tipoInstituicao?: SortOrder
    endereco?: SortOrder
    contato?: SortOrder
    orgaoResponsavel?: SortOrder
    _count?: EducacaoCountOrderByAggregateInput
    _max?: EducacaoMaxOrderByAggregateInput
    _min?: EducacaoMinOrderByAggregateInput
  }

  export type EducacaoScalarWhereWithAggregatesInput = {
    AND?: EducacaoScalarWhereWithAggregatesInput | EducacaoScalarWhereWithAggregatesInput[]
    OR?: EducacaoScalarWhereWithAggregatesInput[]
    NOT?: EducacaoScalarWhereWithAggregatesInput | EducacaoScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Educacao"> | string
    nomeInstituicao?: StringWithAggregatesFilter<"Educacao"> | string
    tipoInstituicao?: StringWithAggregatesFilter<"Educacao"> | string
    endereco?: StringWithAggregatesFilter<"Educacao"> | string
    contato?: StringNullableWithAggregatesFilter<"Educacao"> | string | null
    orgaoResponsavel?: StringWithAggregatesFilter<"Educacao"> | string
  }

  export type UrgenciaWhereInput = {
    AND?: UrgenciaWhereInput | UrgenciaWhereInput[]
    OR?: UrgenciaWhereInput[]
    NOT?: UrgenciaWhereInput | UrgenciaWhereInput[]
    id?: StringFilter<"Urgencia"> | string
    tipoServico?: StringFilter<"Urgencia"> | string
    contato?: StringFilter<"Urgencia"> | string
    localizacao?: StringFilter<"Urgencia"> | string
    descricao?: StringNullableFilter<"Urgencia"> | string | null
    disponibilidade?: StringNullableFilter<"Urgencia"> | string | null
  }

  export type UrgenciaOrderByWithRelationInput = {
    id?: SortOrder
    tipoServico?: SortOrder
    contato?: SortOrder
    localizacao?: SortOrder
    descricao?: SortOrder
    disponibilidade?: SortOrder
  }

  export type UrgenciaWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: UrgenciaWhereInput | UrgenciaWhereInput[]
    OR?: UrgenciaWhereInput[]
    NOT?: UrgenciaWhereInput | UrgenciaWhereInput[]
    tipoServico?: StringFilter<"Urgencia"> | string
    contato?: StringFilter<"Urgencia"> | string
    localizacao?: StringFilter<"Urgencia"> | string
    descricao?: StringNullableFilter<"Urgencia"> | string | null
    disponibilidade?: StringNullableFilter<"Urgencia"> | string | null
  }, "id">

  export type UrgenciaOrderByWithAggregationInput = {
    id?: SortOrder
    tipoServico?: SortOrder
    contato?: SortOrder
    localizacao?: SortOrder
    descricao?: SortOrder
    disponibilidade?: SortOrder
    _count?: UrgenciaCountOrderByAggregateInput
    _max?: UrgenciaMaxOrderByAggregateInput
    _min?: UrgenciaMinOrderByAggregateInput
  }

  export type UrgenciaScalarWhereWithAggregatesInput = {
    AND?: UrgenciaScalarWhereWithAggregatesInput | UrgenciaScalarWhereWithAggregatesInput[]
    OR?: UrgenciaScalarWhereWithAggregatesInput[]
    NOT?: UrgenciaScalarWhereWithAggregatesInput | UrgenciaScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Urgencia"> | string
    tipoServico?: StringWithAggregatesFilter<"Urgencia"> | string
    contato?: StringWithAggregatesFilter<"Urgencia"> | string
    localizacao?: StringWithAggregatesFilter<"Urgencia"> | string
    descricao?: StringNullableWithAggregatesFilter<"Urgencia"> | string | null
    disponibilidade?: StringNullableWithAggregatesFilter<"Urgencia"> | string | null
  }

  export type DireitosWhereInput = {
    AND?: DireitosWhereInput | DireitosWhereInput[]
    OR?: DireitosWhereInput[]
    NOT?: DireitosWhereInput | DireitosWhereInput[]
    id?: StringFilter<"Direitos"> | string
    tipoDireito?: StringFilter<"Direitos"> | string
    descricao?: StringFilter<"Direitos"> | string
    comoSolicitar?: StringNullableFilter<"Direitos"> | string | null
    documentosNecessarios?: StringNullableFilter<"Direitos"> | string | null
    orgaoResponsavel?: StringFilter<"Direitos"> | string
  }

  export type DireitosOrderByWithRelationInput = {
    id?: SortOrder
    tipoDireito?: SortOrder
    descricao?: SortOrder
    comoSolicitar?: SortOrder
    documentosNecessarios?: SortOrder
    orgaoResponsavel?: SortOrder
  }

  export type DireitosWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: DireitosWhereInput | DireitosWhereInput[]
    OR?: DireitosWhereInput[]
    NOT?: DireitosWhereInput | DireitosWhereInput[]
    tipoDireito?: StringFilter<"Direitos"> | string
    descricao?: StringFilter<"Direitos"> | string
    comoSolicitar?: StringNullableFilter<"Direitos"> | string | null
    documentosNecessarios?: StringNullableFilter<"Direitos"> | string | null
    orgaoResponsavel?: StringFilter<"Direitos"> | string
  }, "id">

  export type DireitosOrderByWithAggregationInput = {
    id?: SortOrder
    tipoDireito?: SortOrder
    descricao?: SortOrder
    comoSolicitar?: SortOrder
    documentosNecessarios?: SortOrder
    orgaoResponsavel?: SortOrder
    _count?: DireitosCountOrderByAggregateInput
    _max?: DireitosMaxOrderByAggregateInput
    _min?: DireitosMinOrderByAggregateInput
  }

  export type DireitosScalarWhereWithAggregatesInput = {
    AND?: DireitosScalarWhereWithAggregatesInput | DireitosScalarWhereWithAggregatesInput[]
    OR?: DireitosScalarWhereWithAggregatesInput[]
    NOT?: DireitosScalarWhereWithAggregatesInput | DireitosScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Direitos"> | string
    tipoDireito?: StringWithAggregatesFilter<"Direitos"> | string
    descricao?: StringWithAggregatesFilter<"Direitos"> | string
    comoSolicitar?: StringNullableWithAggregatesFilter<"Direitos"> | string | null
    documentosNecessarios?: StringNullableWithAggregatesFilter<"Direitos"> | string | null
    orgaoResponsavel?: StringWithAggregatesFilter<"Direitos"> | string
  }

  export type OrgaoPublicoWhereInput = {
    AND?: OrgaoPublicoWhereInput | OrgaoPublicoWhereInput[]
    OR?: OrgaoPublicoWhereInput[]
    NOT?: OrgaoPublicoWhereInput | OrgaoPublicoWhereInput[]
    id?: StringFilter<"OrgaoPublico"> | string
    nome?: StringFilter<"OrgaoPublico"> | string
    titulo?: StringFilter<"OrgaoPublico"> | string
    descricao?: StringNullableFilter<"OrgaoPublico"> | string | null
    urlImagem?: StringNullableFilter<"OrgaoPublico"> | string | null
    esfera?: StringFilter<"OrgaoPublico"> | string
    uf?: StringNullableFilter<"OrgaoPublico"> | string | null
    municipio?: StringNullableFilter<"OrgaoPublico"> | string | null
    totalConjuntosDados?: IntFilter<"OrgaoPublico"> | number
    totalSeguidores?: IntFilter<"OrgaoPublico"> | number
    dataCriacao?: DateTimeFilter<"OrgaoPublico"> | Date | string
    ultimaAtualizacao?: DateTimeNullableFilter<"OrgaoPublico"> | Date | string | null
  }

  export type OrgaoPublicoOrderByWithRelationInput = {
    id?: SortOrder
    nome?: SortOrder
    titulo?: SortOrder
    descricao?: SortOrder
    urlImagem?: SortOrder
    esfera?: SortOrder
    uf?: SortOrder
    municipio?: SortOrder
    totalConjuntosDados?: SortOrder
    totalSeguidores?: SortOrder
    dataCriacao?: SortOrder
    ultimaAtualizacao?: SortOrder
  }

  export type OrgaoPublicoWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    nome?: string
    AND?: OrgaoPublicoWhereInput | OrgaoPublicoWhereInput[]
    OR?: OrgaoPublicoWhereInput[]
    NOT?: OrgaoPublicoWhereInput | OrgaoPublicoWhereInput[]
    titulo?: StringFilter<"OrgaoPublico"> | string
    descricao?: StringNullableFilter<"OrgaoPublico"> | string | null
    urlImagem?: StringNullableFilter<"OrgaoPublico"> | string | null
    esfera?: StringFilter<"OrgaoPublico"> | string
    uf?: StringNullableFilter<"OrgaoPublico"> | string | null
    municipio?: StringNullableFilter<"OrgaoPublico"> | string | null
    totalConjuntosDados?: IntFilter<"OrgaoPublico"> | number
    totalSeguidores?: IntFilter<"OrgaoPublico"> | number
    dataCriacao?: DateTimeFilter<"OrgaoPublico"> | Date | string
    ultimaAtualizacao?: DateTimeNullableFilter<"OrgaoPublico"> | Date | string | null
  }, "id" | "nome">

  export type OrgaoPublicoOrderByWithAggregationInput = {
    id?: SortOrder
    nome?: SortOrder
    titulo?: SortOrder
    descricao?: SortOrder
    urlImagem?: SortOrder
    esfera?: SortOrder
    uf?: SortOrder
    municipio?: SortOrder
    totalConjuntosDados?: SortOrder
    totalSeguidores?: SortOrder
    dataCriacao?: SortOrder
    ultimaAtualizacao?: SortOrder
    _count?: OrgaoPublicoCountOrderByAggregateInput
    _avg?: OrgaoPublicoAvgOrderByAggregateInput
    _max?: OrgaoPublicoMaxOrderByAggregateInput
    _min?: OrgaoPublicoMinOrderByAggregateInput
    _sum?: OrgaoPublicoSumOrderByAggregateInput
  }

  export type OrgaoPublicoScalarWhereWithAggregatesInput = {
    AND?: OrgaoPublicoScalarWhereWithAggregatesInput | OrgaoPublicoScalarWhereWithAggregatesInput[]
    OR?: OrgaoPublicoScalarWhereWithAggregatesInput[]
    NOT?: OrgaoPublicoScalarWhereWithAggregatesInput | OrgaoPublicoScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"OrgaoPublico"> | string
    nome?: StringWithAggregatesFilter<"OrgaoPublico"> | string
    titulo?: StringWithAggregatesFilter<"OrgaoPublico"> | string
    descricao?: StringNullableWithAggregatesFilter<"OrgaoPublico"> | string | null
    urlImagem?: StringNullableWithAggregatesFilter<"OrgaoPublico"> | string | null
    esfera?: StringWithAggregatesFilter<"OrgaoPublico"> | string
    uf?: StringNullableWithAggregatesFilter<"OrgaoPublico"> | string | null
    municipio?: StringNullableWithAggregatesFilter<"OrgaoPublico"> | string | null
    totalConjuntosDados?: IntWithAggregatesFilter<"OrgaoPublico"> | number
    totalSeguidores?: IntWithAggregatesFilter<"OrgaoPublico"> | number
    dataCriacao?: DateTimeWithAggregatesFilter<"OrgaoPublico"> | Date | string
    ultimaAtualizacao?: DateTimeNullableWithAggregatesFilter<"OrgaoPublico"> | Date | string | null
  }

  export type SaudeCreateInput = {
    id?: string
    nomeServico: string
    descricao: string
    orgaoResponsavel: string
    contato?: string | null
    localizacao?: string | null
    horarios?: string | null
  }

  export type SaudeUncheckedCreateInput = {
    id?: string
    nomeServico: string
    descricao: string
    orgaoResponsavel: string
    contato?: string | null
    localizacao?: string | null
    horarios?: string | null
  }

  export type SaudeUpdateInput = {
    nomeServico?: StringFieldUpdateOperationsInput | string
    descricao?: StringFieldUpdateOperationsInput | string
    orgaoResponsavel?: StringFieldUpdateOperationsInput | string
    contato?: NullableStringFieldUpdateOperationsInput | string | null
    localizacao?: NullableStringFieldUpdateOperationsInput | string | null
    horarios?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SaudeUncheckedUpdateInput = {
    nomeServico?: StringFieldUpdateOperationsInput | string
    descricao?: StringFieldUpdateOperationsInput | string
    orgaoResponsavel?: StringFieldUpdateOperationsInput | string
    contato?: NullableStringFieldUpdateOperationsInput | string | null
    localizacao?: NullableStringFieldUpdateOperationsInput | string | null
    horarios?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SaudeCreateManyInput = {
    id?: string
    nomeServico: string
    descricao: string
    orgaoResponsavel: string
    contato?: string | null
    localizacao?: string | null
    horarios?: string | null
  }

  export type SaudeUpdateManyMutationInput = {
    nomeServico?: StringFieldUpdateOperationsInput | string
    descricao?: StringFieldUpdateOperationsInput | string
    orgaoResponsavel?: StringFieldUpdateOperationsInput | string
    contato?: NullableStringFieldUpdateOperationsInput | string | null
    localizacao?: NullableStringFieldUpdateOperationsInput | string | null
    horarios?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SaudeUncheckedUpdateManyInput = {
    nomeServico?: StringFieldUpdateOperationsInput | string
    descricao?: StringFieldUpdateOperationsInput | string
    orgaoResponsavel?: StringFieldUpdateOperationsInput | string
    contato?: NullableStringFieldUpdateOperationsInput | string | null
    localizacao?: NullableStringFieldUpdateOperationsInput | string | null
    horarios?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CulturaLazerCreateInput = {
    id?: string
    evento: string
    local: string
    data: string
    horario: string
    organizador: string
    tipo?: string | null
  }

  export type CulturaLazerUncheckedCreateInput = {
    id?: string
    evento: string
    local: string
    data: string
    horario: string
    organizador: string
    tipo?: string | null
  }

  export type CulturaLazerUpdateInput = {
    evento?: StringFieldUpdateOperationsInput | string
    local?: StringFieldUpdateOperationsInput | string
    data?: StringFieldUpdateOperationsInput | string
    horario?: StringFieldUpdateOperationsInput | string
    organizador?: StringFieldUpdateOperationsInput | string
    tipo?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CulturaLazerUncheckedUpdateInput = {
    evento?: StringFieldUpdateOperationsInput | string
    local?: StringFieldUpdateOperationsInput | string
    data?: StringFieldUpdateOperationsInput | string
    horario?: StringFieldUpdateOperationsInput | string
    organizador?: StringFieldUpdateOperationsInput | string
    tipo?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CulturaLazerCreateManyInput = {
    id?: string
    evento: string
    local: string
    data: string
    horario: string
    organizador: string
    tipo?: string | null
  }

  export type CulturaLazerUpdateManyMutationInput = {
    evento?: StringFieldUpdateOperationsInput | string
    local?: StringFieldUpdateOperationsInput | string
    data?: StringFieldUpdateOperationsInput | string
    horario?: StringFieldUpdateOperationsInput | string
    organizador?: StringFieldUpdateOperationsInput | string
    tipo?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CulturaLazerUncheckedUpdateManyInput = {
    evento?: StringFieldUpdateOperationsInput | string
    local?: StringFieldUpdateOperationsInput | string
    data?: StringFieldUpdateOperationsInput | string
    horario?: StringFieldUpdateOperationsInput | string
    organizador?: StringFieldUpdateOperationsInput | string
    tipo?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EducacaoCreateInput = {
    id?: string
    nomeInstituicao: string
    tipoInstituicao: string
    endereco: string
    contato?: string | null
    orgaoResponsavel: string
  }

  export type EducacaoUncheckedCreateInput = {
    id?: string
    nomeInstituicao: string
    tipoInstituicao: string
    endereco: string
    contato?: string | null
    orgaoResponsavel: string
  }

  export type EducacaoUpdateInput = {
    nomeInstituicao?: StringFieldUpdateOperationsInput | string
    tipoInstituicao?: StringFieldUpdateOperationsInput | string
    endereco?: StringFieldUpdateOperationsInput | string
    contato?: NullableStringFieldUpdateOperationsInput | string | null
    orgaoResponsavel?: StringFieldUpdateOperationsInput | string
  }

  export type EducacaoUncheckedUpdateInput = {
    nomeInstituicao?: StringFieldUpdateOperationsInput | string
    tipoInstituicao?: StringFieldUpdateOperationsInput | string
    endereco?: StringFieldUpdateOperationsInput | string
    contato?: NullableStringFieldUpdateOperationsInput | string | null
    orgaoResponsavel?: StringFieldUpdateOperationsInput | string
  }

  export type EducacaoCreateManyInput = {
    id?: string
    nomeInstituicao: string
    tipoInstituicao: string
    endereco: string
    contato?: string | null
    orgaoResponsavel: string
  }

  export type EducacaoUpdateManyMutationInput = {
    nomeInstituicao?: StringFieldUpdateOperationsInput | string
    tipoInstituicao?: StringFieldUpdateOperationsInput | string
    endereco?: StringFieldUpdateOperationsInput | string
    contato?: NullableStringFieldUpdateOperationsInput | string | null
    orgaoResponsavel?: StringFieldUpdateOperationsInput | string
  }

  export type EducacaoUncheckedUpdateManyInput = {
    nomeInstituicao?: StringFieldUpdateOperationsInput | string
    tipoInstituicao?: StringFieldUpdateOperationsInput | string
    endereco?: StringFieldUpdateOperationsInput | string
    contato?: NullableStringFieldUpdateOperationsInput | string | null
    orgaoResponsavel?: StringFieldUpdateOperationsInput | string
  }

  export type UrgenciaCreateInput = {
    id?: string
    tipoServico: string
    contato: string
    localizacao: string
    descricao?: string | null
    disponibilidade?: string | null
  }

  export type UrgenciaUncheckedCreateInput = {
    id?: string
    tipoServico: string
    contato: string
    localizacao: string
    descricao?: string | null
    disponibilidade?: string | null
  }

  export type UrgenciaUpdateInput = {
    tipoServico?: StringFieldUpdateOperationsInput | string
    contato?: StringFieldUpdateOperationsInput | string
    localizacao?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    disponibilidade?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UrgenciaUncheckedUpdateInput = {
    tipoServico?: StringFieldUpdateOperationsInput | string
    contato?: StringFieldUpdateOperationsInput | string
    localizacao?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    disponibilidade?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UrgenciaCreateManyInput = {
    id?: string
    tipoServico: string
    contato: string
    localizacao: string
    descricao?: string | null
    disponibilidade?: string | null
  }

  export type UrgenciaUpdateManyMutationInput = {
    tipoServico?: StringFieldUpdateOperationsInput | string
    contato?: StringFieldUpdateOperationsInput | string
    localizacao?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    disponibilidade?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UrgenciaUncheckedUpdateManyInput = {
    tipoServico?: StringFieldUpdateOperationsInput | string
    contato?: StringFieldUpdateOperationsInput | string
    localizacao?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    disponibilidade?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DireitosCreateInput = {
    id?: string
    tipoDireito: string
    descricao: string
    comoSolicitar?: string | null
    documentosNecessarios?: string | null
    orgaoResponsavel: string
  }

  export type DireitosUncheckedCreateInput = {
    id?: string
    tipoDireito: string
    descricao: string
    comoSolicitar?: string | null
    documentosNecessarios?: string | null
    orgaoResponsavel: string
  }

  export type DireitosUpdateInput = {
    tipoDireito?: StringFieldUpdateOperationsInput | string
    descricao?: StringFieldUpdateOperationsInput | string
    comoSolicitar?: NullableStringFieldUpdateOperationsInput | string | null
    documentosNecessarios?: NullableStringFieldUpdateOperationsInput | string | null
    orgaoResponsavel?: StringFieldUpdateOperationsInput | string
  }

  export type DireitosUncheckedUpdateInput = {
    tipoDireito?: StringFieldUpdateOperationsInput | string
    descricao?: StringFieldUpdateOperationsInput | string
    comoSolicitar?: NullableStringFieldUpdateOperationsInput | string | null
    documentosNecessarios?: NullableStringFieldUpdateOperationsInput | string | null
    orgaoResponsavel?: StringFieldUpdateOperationsInput | string
  }

  export type DireitosCreateManyInput = {
    id?: string
    tipoDireito: string
    descricao: string
    comoSolicitar?: string | null
    documentosNecessarios?: string | null
    orgaoResponsavel: string
  }

  export type DireitosUpdateManyMutationInput = {
    tipoDireito?: StringFieldUpdateOperationsInput | string
    descricao?: StringFieldUpdateOperationsInput | string
    comoSolicitar?: NullableStringFieldUpdateOperationsInput | string | null
    documentosNecessarios?: NullableStringFieldUpdateOperationsInput | string | null
    orgaoResponsavel?: StringFieldUpdateOperationsInput | string
  }

  export type DireitosUncheckedUpdateManyInput = {
    tipoDireito?: StringFieldUpdateOperationsInput | string
    descricao?: StringFieldUpdateOperationsInput | string
    comoSolicitar?: NullableStringFieldUpdateOperationsInput | string | null
    documentosNecessarios?: NullableStringFieldUpdateOperationsInput | string | null
    orgaoResponsavel?: StringFieldUpdateOperationsInput | string
  }

  export type OrgaoPublicoCreateInput = {
    id?: string
    nome: string
    titulo: string
    descricao?: string | null
    urlImagem?: string | null
    esfera: string
    uf?: string | null
    municipio?: string | null
    totalConjuntosDados?: number
    totalSeguidores?: number
    dataCriacao?: Date | string
    ultimaAtualizacao?: Date | string | null
  }

  export type OrgaoPublicoUncheckedCreateInput = {
    id?: string
    nome: string
    titulo: string
    descricao?: string | null
    urlImagem?: string | null
    esfera: string
    uf?: string | null
    municipio?: string | null
    totalConjuntosDados?: number
    totalSeguidores?: number
    dataCriacao?: Date | string
    ultimaAtualizacao?: Date | string | null
  }

  export type OrgaoPublicoUpdateInput = {
    nome?: StringFieldUpdateOperationsInput | string
    titulo?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    urlImagem?: NullableStringFieldUpdateOperationsInput | string | null
    esfera?: StringFieldUpdateOperationsInput | string
    uf?: NullableStringFieldUpdateOperationsInput | string | null
    municipio?: NullableStringFieldUpdateOperationsInput | string | null
    totalConjuntosDados?: IntFieldUpdateOperationsInput | number
    totalSeguidores?: IntFieldUpdateOperationsInput | number
    dataCriacao?: DateTimeFieldUpdateOperationsInput | Date | string
    ultimaAtualizacao?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type OrgaoPublicoUncheckedUpdateInput = {
    nome?: StringFieldUpdateOperationsInput | string
    titulo?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    urlImagem?: NullableStringFieldUpdateOperationsInput | string | null
    esfera?: StringFieldUpdateOperationsInput | string
    uf?: NullableStringFieldUpdateOperationsInput | string | null
    municipio?: NullableStringFieldUpdateOperationsInput | string | null
    totalConjuntosDados?: IntFieldUpdateOperationsInput | number
    totalSeguidores?: IntFieldUpdateOperationsInput | number
    dataCriacao?: DateTimeFieldUpdateOperationsInput | Date | string
    ultimaAtualizacao?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type OrgaoPublicoCreateManyInput = {
    id?: string
    nome: string
    titulo: string
    descricao?: string | null
    urlImagem?: string | null
    esfera: string
    uf?: string | null
    municipio?: string | null
    totalConjuntosDados?: number
    totalSeguidores?: number
    dataCriacao?: Date | string
    ultimaAtualizacao?: Date | string | null
  }

  export type OrgaoPublicoUpdateManyMutationInput = {
    nome?: StringFieldUpdateOperationsInput | string
    titulo?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    urlImagem?: NullableStringFieldUpdateOperationsInput | string | null
    esfera?: StringFieldUpdateOperationsInput | string
    uf?: NullableStringFieldUpdateOperationsInput | string | null
    municipio?: NullableStringFieldUpdateOperationsInput | string | null
    totalConjuntosDados?: IntFieldUpdateOperationsInput | number
    totalSeguidores?: IntFieldUpdateOperationsInput | number
    dataCriacao?: DateTimeFieldUpdateOperationsInput | Date | string
    ultimaAtualizacao?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type OrgaoPublicoUncheckedUpdateManyInput = {
    nome?: StringFieldUpdateOperationsInput | string
    titulo?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    urlImagem?: NullableStringFieldUpdateOperationsInput | string | null
    esfera?: StringFieldUpdateOperationsInput | string
    uf?: NullableStringFieldUpdateOperationsInput | string | null
    municipio?: NullableStringFieldUpdateOperationsInput | string | null
    totalConjuntosDados?: IntFieldUpdateOperationsInput | number
    totalSeguidores?: IntFieldUpdateOperationsInput | number
    dataCriacao?: DateTimeFieldUpdateOperationsInput | Date | string
    ultimaAtualizacao?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
    isSet?: boolean
  }

  export type SaudeCountOrderByAggregateInput = {
    id?: SortOrder
    nomeServico?: SortOrder
    descricao?: SortOrder
    orgaoResponsavel?: SortOrder
    contato?: SortOrder
    localizacao?: SortOrder
    horarios?: SortOrder
  }

  export type SaudeMaxOrderByAggregateInput = {
    id?: SortOrder
    nomeServico?: SortOrder
    descricao?: SortOrder
    orgaoResponsavel?: SortOrder
    contato?: SortOrder
    localizacao?: SortOrder
    horarios?: SortOrder
  }

  export type SaudeMinOrderByAggregateInput = {
    id?: SortOrder
    nomeServico?: SortOrder
    descricao?: SortOrder
    orgaoResponsavel?: SortOrder
    contato?: SortOrder
    localizacao?: SortOrder
    horarios?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type CulturaLazerCountOrderByAggregateInput = {
    id?: SortOrder
    evento?: SortOrder
    local?: SortOrder
    data?: SortOrder
    horario?: SortOrder
    organizador?: SortOrder
    tipo?: SortOrder
  }

  export type CulturaLazerMaxOrderByAggregateInput = {
    id?: SortOrder
    evento?: SortOrder
    local?: SortOrder
    data?: SortOrder
    horario?: SortOrder
    organizador?: SortOrder
    tipo?: SortOrder
  }

  export type CulturaLazerMinOrderByAggregateInput = {
    id?: SortOrder
    evento?: SortOrder
    local?: SortOrder
    data?: SortOrder
    horario?: SortOrder
    organizador?: SortOrder
    tipo?: SortOrder
  }

  export type EducacaoCountOrderByAggregateInput = {
    id?: SortOrder
    nomeInstituicao?: SortOrder
    tipoInstituicao?: SortOrder
    endereco?: SortOrder
    contato?: SortOrder
    orgaoResponsavel?: SortOrder
  }

  export type EducacaoMaxOrderByAggregateInput = {
    id?: SortOrder
    nomeInstituicao?: SortOrder
    tipoInstituicao?: SortOrder
    endereco?: SortOrder
    contato?: SortOrder
    orgaoResponsavel?: SortOrder
  }

  export type EducacaoMinOrderByAggregateInput = {
    id?: SortOrder
    nomeInstituicao?: SortOrder
    tipoInstituicao?: SortOrder
    endereco?: SortOrder
    contato?: SortOrder
    orgaoResponsavel?: SortOrder
  }

  export type UrgenciaCountOrderByAggregateInput = {
    id?: SortOrder
    tipoServico?: SortOrder
    contato?: SortOrder
    localizacao?: SortOrder
    descricao?: SortOrder
    disponibilidade?: SortOrder
  }

  export type UrgenciaMaxOrderByAggregateInput = {
    id?: SortOrder
    tipoServico?: SortOrder
    contato?: SortOrder
    localizacao?: SortOrder
    descricao?: SortOrder
    disponibilidade?: SortOrder
  }

  export type UrgenciaMinOrderByAggregateInput = {
    id?: SortOrder
    tipoServico?: SortOrder
    contato?: SortOrder
    localizacao?: SortOrder
    descricao?: SortOrder
    disponibilidade?: SortOrder
  }

  export type DireitosCountOrderByAggregateInput = {
    id?: SortOrder
    tipoDireito?: SortOrder
    descricao?: SortOrder
    comoSolicitar?: SortOrder
    documentosNecessarios?: SortOrder
    orgaoResponsavel?: SortOrder
  }

  export type DireitosMaxOrderByAggregateInput = {
    id?: SortOrder
    tipoDireito?: SortOrder
    descricao?: SortOrder
    comoSolicitar?: SortOrder
    documentosNecessarios?: SortOrder
    orgaoResponsavel?: SortOrder
  }

  export type DireitosMinOrderByAggregateInput = {
    id?: SortOrder
    tipoDireito?: SortOrder
    descricao?: SortOrder
    comoSolicitar?: SortOrder
    documentosNecessarios?: SortOrder
    orgaoResponsavel?: SortOrder
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
    isSet?: boolean
  }

  export type OrgaoPublicoCountOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    titulo?: SortOrder
    descricao?: SortOrder
    urlImagem?: SortOrder
    esfera?: SortOrder
    uf?: SortOrder
    municipio?: SortOrder
    totalConjuntosDados?: SortOrder
    totalSeguidores?: SortOrder
    dataCriacao?: SortOrder
    ultimaAtualizacao?: SortOrder
  }

  export type OrgaoPublicoAvgOrderByAggregateInput = {
    totalConjuntosDados?: SortOrder
    totalSeguidores?: SortOrder
  }

  export type OrgaoPublicoMaxOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    titulo?: SortOrder
    descricao?: SortOrder
    urlImagem?: SortOrder
    esfera?: SortOrder
    uf?: SortOrder
    municipio?: SortOrder
    totalConjuntosDados?: SortOrder
    totalSeguidores?: SortOrder
    dataCriacao?: SortOrder
    ultimaAtualizacao?: SortOrder
  }

  export type OrgaoPublicoMinOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    titulo?: SortOrder
    descricao?: SortOrder
    urlImagem?: SortOrder
    esfera?: SortOrder
    uf?: SortOrder
    municipio?: SortOrder
    totalConjuntosDados?: SortOrder
    totalSeguidores?: SortOrder
    dataCriacao?: SortOrder
    ultimaAtualizacao?: SortOrder
  }

  export type OrgaoPublicoSumOrderByAggregateInput = {
    totalConjuntosDados?: SortOrder
    totalSeguidores?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
    unset?: boolean
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
    unset?: boolean
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
    isSet?: boolean
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
    isSet?: boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
    isSet?: boolean
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
    isSet?: boolean
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}