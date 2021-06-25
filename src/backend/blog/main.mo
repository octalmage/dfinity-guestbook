import List "mo:base/List";
import Option "mo:base/Option";
import Trie "mo:base/Trie";
import Time "mo:base/Time";
import Cycles "mo:base/ExperimentalCycles";

actor {
  public type BlogId = Nat32;

  public type Blog = {
    body : Text;
    author : Text;
    timestamp : Int;
  };

  private stable var next : BlogId = 0;

  private stable var praises : Trie.Trie<BlogId, Nat32> = Trie.empty();

  private stable var poops : Trie.Trie<BlogId, Nat32> = Trie.empty();

  // The blogs data store.
  private stable var blogs : Trie.Trie<BlogId, Blog> = Trie.empty();

   // Create a blog post.
  public func create(blog : Blog) : async BlogId {
    let blogId = next;
    next += 1;

    if (blog.author.size() > 256) {
      // TODO: Make this return an error.
      return 0
    };

    blogs := Trie.replace(
      blogs,
      key(blogId),
      eq,
      ?blog,
    ).0;
    return blogId;
  };

  public func createPraise(blogId: BlogId) : async BlogId {
    var praisesForTheBlog = Trie.find(praises, key(blogId), eq);
    if (Option.isNull(praisesForTheBlog)) {
      praisesForTheBlog = Option.make(0);
    };

    // praisesForTheBlog = ?praisesForTheBlog + 1;
    praises := Trie.replace(
      praises,
      key(blogId),
      eq,
      ?praisesForTheBlog
    ).0;
    return blogId;
  };

  public query func read(blogId : BlogId) : async ?Blog {
    let result = Trie.find(blogs, key(blogId), eq);
    return result;
  };

  public query func readAll() : async Trie.Trie<BlogId, Blog>  {
    return blogs;
  };

  public query func readAllPraises() : async Trie.Trie<BlogId, Nat32>  {
    return praises;
  };

  public query func readAllPoops() : async Trie.Trie<BlogId, Nat32>  {
    return poops;
  };

   private func eq(x : BlogId, y : BlogId) : Bool {
    return x == y;
  };

  private func key(x : BlogId) : Trie.Key<BlogId> {
    return { hash = x; key = x };
  };

  //Internal cycle management
  public func acceptCycles() : async () {
    let available = Cycles.available();
    let accepted = Cycles.accept(available);
    assert (accepted == available);
  };

  public query func availableCycles() : async Nat {
    return Cycles.balance();
  };
};