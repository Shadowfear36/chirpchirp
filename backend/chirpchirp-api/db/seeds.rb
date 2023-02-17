User.destroy_all
Comment.destroy_all
Post.destroy_all
Flock.destroy_all

puts "Creating Users..."
# Users 
U1 = User.create(name: "Dylan", username: "DaRealDyl", email: "dylan@gmail.com", password: "123456", pfpURL: "https://voicesofoklahoma.com/assets/img/interviews/logsdon-guy-slides-01.jpg", bannerURL: "https://pbs.twimg.com/media/D-jnUF5UIAEA6Cl?format=jpg&name=large", flock_id: 1)

U2 = User.create(name: "Nadia", username: "SuperStar", email: "nadia@gmail.com", password: "Password", pfpURL: "https://hewlett.org/wp-content/uploads/2018/12/20181113-Hewlett_Foundation-Carla_Bernal-0002-RT2-250x250.jpg", bannerURL: "https://pbs.twimg.com/media/Dk1W8MBX4AAFSW2.jpg", flock_id: 2)


U3 = User.create(name: "Adam", username: "Atom", email: "Adam@gmail.com", password: "NotAPassword", pfpURL: "https://bestinmedicine.org/wp-content/uploads/2018/12/Guy-Maytal-MD-250x250.jpg", bannerURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOltKOAmpBrqgiKPI94loWdQ8CVM5nYRzG6prPgBl8F32iWSWOZJ9lYVpkujsxeiNgA9Q&usqp=CAU", flock_id: 3)

U4 = User.create(name: "Walt", username: "WaltDaMan", email: "Walt@gmail.com", password: "ThisisAPassword", pfpURL: "https://www.publicbooks.org/wp-content/uploads/2021/03/UOW-Teacher-Potraiture-Tim-da-Rin-0130_preview-e1617206420655-250x250.jpg", bannerURL: "https://i.pinimg.com/originals/66/6e/7a/666e7a78623f42b80583517b57d7c540.jpg", flock_id: 4)


# Posts
puts "Creating Posts..."

P1 = Post.create(content: "This Project was a lot of work lol.", likes: 10, user_id: U1.id, username: U1.username, pfpURL: U1.pfpURL)

P2 = Post.create(content: "I promise this isn't my last post", likes: 3, user_id: U2.id, username: U2.username, pfpURL: U2.pfpURL)

P3 = Post.create(content: "My head hurts from looking at all this code.", likes: 7, user_id: U2.id, username: U2.username, pfpURL: U2.pfpURL)


P4 = Post.create(content: "I'm tired of making seed data lmao", likes: 100, user_id: U3.id, username: U3.username, pfpURL: U3.pfpURL)

P5 = Post.create(content: "Wait, we actually finished this thing?", likes: 1, user_id: U4.id, username: U4.username, pfpURL: U4.pfpURL)

P6 = Post.create(content: "Im not sure what else to put as seed data tbh.", likes: 4, user_id: U4.id, username: U4.username, pfpURL: U4.pfpURL)


# comments 

puts "Creating Comments..."

C1 = Comment.create(content: "lmao this is great", likes: 1000, user_id: U2.id, post_id: P4.id)

C2 = Comment.create(content: "Seed Data sucks. Can we just have users already?", likes: 1, user_id: U1.id, post_id: P2.id)

C3 = Comment.create(content: "Join my flock?", likes: 100, user_id: U3.id, post_id: P6.id)

C4 = Comment.create(content: "Lets go meet the flockers", likes: 9, user_id: U4.id, post_id: P6.id)

puts "Creating friendships..."

F1 = Flock.create(flocker_id: U2.id, flockee_id: U1.id)
F5 = Flock.create(flocker_id: U2.id, flockee_id: U3.id)
F2 = Flock.create(flocker_id: U1.id, flockee_id: U2.id)
F3 = Flock.create(flocker_id: U3.id, flockee_id: U2.id)
F4 = Flock.create(flocker_id: U1.id, flockee_id: U3.id)

puts "All Done!"


