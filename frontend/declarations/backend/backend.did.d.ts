import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Post {
  'id' : bigint,
  'title' : string,
  'body' : string,
  'author' : Principal,
  'timestamp' : Time,
}
export type Time = bigint;
export interface _SERVICE {
  'createPost' : ActorMethod<[string, string], bigint>,
  'getOwnPosts' : ActorMethod<[], Array<Post>>,
  'getPosts' : ActorMethod<[], Array<Post>>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
