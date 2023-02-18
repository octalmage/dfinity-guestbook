import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export type AssocList = [] | [[[Key, number], List]];
export type AssocList_1 = [] | [[[Key, Blog], List_1]];
export interface Blog {
  'body' : string,
  'author' : string,
  'timestamp' : bigint,
}
export type BlogId = number;
export interface Branch { 'left' : Trie, 'size' : bigint, 'right' : Trie }
export interface Branch_1 { 'left' : Trie_1, 'size' : bigint, 'right' : Trie_1 }
export type Hash = number;
export interface Key { 'key' : BlogId, 'hash' : Hash }
export interface Leaf { 'size' : bigint, 'keyvals' : AssocList }
export interface Leaf_1 { 'size' : bigint, 'keyvals' : AssocList_1 }
export type List = [] | [[[Key, number], List]];
export type List_1 = [] | [[[Key, Blog], List_1]];
export type Trie = { 'branch' : Branch } |
  { 'leaf' : Leaf } |
  { 'empty' : null };
export type Trie_1 = { 'branch' : Branch_1 } |
  { 'leaf' : Leaf_1 } |
  { 'empty' : null };
export interface _SERVICE {
  'acceptCycles' : ActorMethod<[], undefined>,
  'availableCycles' : ActorMethod<[], bigint>,
  'create' : ActorMethod<[Blog], BlogId>,
  'createPoop' : ActorMethod<[BlogId], BlogId>,
  'createPraise' : ActorMethod<[BlogId], BlogId>,
  'read' : ActorMethod<[BlogId], [] | [Blog]>,
  'readAll' : ActorMethod<[], Trie_1>,
  'readAllPoops' : ActorMethod<[], Trie>,
  'readAllPraises' : ActorMethod<[], Trie>,
}
