User.destroy_all
Comment.destroy_all
Post.destroy_all
Flock.destroy_all

puts "Creating Users..."
# Users 
U1 = User.create(name: "Dylan", username: "TestTest", email: "dylan@gmail.com", password: "123456", pfpURL: "thislink.com", bannerURL: "thislink.com", flock_id: 1)

U2 = User.create(name: "Nadia", username: "JohnJohn", email: "nadia@gmail.com", password: "Password", pfpURL: "thislink.com", bannerURL: "thislink.com", flock_id: 2)


U3 = User.create(name: "Adam", username: "janeJane", email: "Adam@gmail.com", password: "NotAPassword", pfpURL: "thislink.com", bannerURL: "thislink.com", flock_id: 3)

U4 = User.create(name: "Walt", username: "jackjack", email: "Walt@gmail.com", password: "ThisisAPassword", pfpURL: "thislink.com", bannerURL: "thislink.com", flock_id: 4)


# Posts
puts "Creating Posts..."

P1 = Post.create(content: "This is a post", likes: 10, user_id: U1.id, username: U1.username, pfpURL: U1.pfpURL)

P2 = Post.create(content: "This is not a post", likes: 3, user_id: U2.id, username: U2.username, pfpURL: U2.pfpURL)

P3 = Post.create(content: "This is my first post", likes: 7, user_id: U2.id, username: U2.username, pfpURL: U2.pfpURL)


P4 = Post.create(content: "This is my first post", likes: 100, user_id: U3.id, username: U3.username, pfpURL: U3.pfpURL)

P5 = Post.create(content: "This is my post", likes: 1, user_id: U4.id, username: U4.username, pfpURL: U4.pfpURL)

P6 = Post.create(content: "This is my next post", likes: 4, user_id: U4.id, username: U4.username, pfpURL: U4.pfpURL)


# comments 

puts "Creating Comments..."

C1 = Comment.create(content: "this post rocks", likes: 1000, user_id: U2.id, post_id: P4.id)

C2 = Comment.create(content: "this post is ehh", likes: 1, user_id: U1.id, post_id: P2.id)

C3 = Comment.create(content: "this post is splendid", likes: 100, user_id: U3.id, post_id: P6.id)

C4 = Comment.create(content: "Go home.", likes: 9, user_id: U4.id, post_id: P6.id)


F1 = Flock.create(flocker_id: U2.id, flockee_id: U1.id)
F5 = Flock.create(flocker_id: U2.id, flockee_id: U3.id)
F2 = Flock.create(flocker_id: U1.id, flockee_id: U2.id)
F3 = Flock.create(flocker_id: U3.id, flockee_id: U2.id)
F4 = Flock.create(flocker_id: U1.id, flockee_id: U3.id)



