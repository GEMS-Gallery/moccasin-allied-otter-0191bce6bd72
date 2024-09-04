import Bool "mo:base/Bool";
import Nat "mo:base/Nat";
import Text "mo:base/Text";

import Time "mo:base/Time";
import Array "mo:base/Array";
import Int "mo:base/Int";
import Principal "mo:base/Principal";

actor {
  type Post = {
    id: Nat;
    title: Text;
    body: Text;
    author: Principal;
    timestamp: Time.Time;
  };

  stable var posts : [Post] = [];
  stable var nextId : Nat = 0;

  public shared(msg) func createPost(title: Text, body: Text) : async Nat {
    let post : Post = {
      id = nextId;
      title = title;
      body = body;
      author = msg.caller;
      timestamp = Time.now();
    };
    posts := Array.append(posts, [post]);
    nextId += 1;
    post.id
  };

  public query func getPosts() : async [Post] {
    Array.sort(posts, func(a: Post, b: Post) : { #less; #equal; #greater } {
      Int.compare(b.timestamp, a.timestamp)
    })
  };

  public shared query(msg) func getOwnPosts() : async [Post] {
    Array.filter(posts, func(post: Post) : Bool {
      post.author == msg.caller
    })
  };
}
