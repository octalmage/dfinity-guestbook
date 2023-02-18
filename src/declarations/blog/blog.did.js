export const idlFactory = ({ IDL }) => {
  const List = IDL.Rec();
  const List_1 = IDL.Rec();
  const Trie = IDL.Rec();
  const Trie_1 = IDL.Rec();
  const Blog = IDL.Record({
    'body' : IDL.Text,
    'author' : IDL.Text,
    'timestamp' : IDL.Int,
  });
  const BlogId = IDL.Nat32;
  const Branch_1 = IDL.Record({
    'left' : Trie_1,
    'size' : IDL.Nat,
    'right' : Trie_1,
  });
  const Hash = IDL.Nat32;
  const Key = IDL.Record({ 'key' : BlogId, 'hash' : Hash });
  List_1.fill(IDL.Opt(IDL.Tuple(IDL.Tuple(Key, Blog), List_1)));
  const AssocList_1 = IDL.Opt(IDL.Tuple(IDL.Tuple(Key, Blog), List_1));
  const Leaf_1 = IDL.Record({ 'size' : IDL.Nat, 'keyvals' : AssocList_1 });
  Trie_1.fill(
    IDL.Variant({ 'branch' : Branch_1, 'leaf' : Leaf_1, 'empty' : IDL.Null })
  );
  const Branch = IDL.Record({
    'left' : Trie,
    'size' : IDL.Nat,
    'right' : Trie,
  });
  List.fill(IDL.Opt(IDL.Tuple(IDL.Tuple(Key, IDL.Nat32), List)));
  const AssocList = IDL.Opt(IDL.Tuple(IDL.Tuple(Key, IDL.Nat32), List));
  const Leaf = IDL.Record({ 'size' : IDL.Nat, 'keyvals' : AssocList });
  Trie.fill(
    IDL.Variant({ 'branch' : Branch, 'leaf' : Leaf, 'empty' : IDL.Null })
  );
  return IDL.Service({
    'acceptCycles' : IDL.Func([], [], []),
    'availableCycles' : IDL.Func([], [IDL.Nat], ['query']),
    'create' : IDL.Func([Blog], [BlogId], []),
    'createPoop' : IDL.Func([BlogId], [BlogId], []),
    'createPraise' : IDL.Func([BlogId], [BlogId], []),
    'read' : IDL.Func([BlogId], [IDL.Opt(Blog)], ['query']),
    'readAll' : IDL.Func([], [Trie_1], ['query']),
    'readAllPoops' : IDL.Func([], [Trie], ['query']),
    'readAllPraises' : IDL.Func([], [Trie], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
