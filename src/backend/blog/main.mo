import List "mo:base/List";
import Option "mo:base/Option";
import Trie "mo:base/Trie";
import Time "mo:base/Time";

actor {
  public type BlogId = Nat32;

  public type Blog = {
    body : Text;
    author : Text;
    timestamp : Int;
  };

  private stable var next : BlogId = 0;

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

  public query func read(blogId : BlogId) : async ?Blog {
    let result = Trie.find(blogs, key(blogId), eq);
    return result;
  };

  public query func readAll() : async Trie.Trie<BlogId, Blog>  {
    return blogs;
  };

   private func eq(x : BlogId, y : BlogId) : Bool {
    return x == y;
  };

  private func key(x : BlogId) : Trie.Key<BlogId> {
    return { hash = x; key = x };
  };
};