class UsersController < ApplicationController
    

    #get all users
    get '/users' do
        User.all.to_json
    end

    #post a new user
    post '/users' do
        user = User.create(name: params[:name], username: params[:username], email: params[:email], password: params[:password], pfpURL: params[:pfpURL], bannerURL: params[:bannerURL])
        user.to_json
    end


    # update user from database
    patch '/users/:username' do
        user1 = User.find_by_username(params[:username])

        if (params[:name] != nil) 
            user1.update_attributes(name: params[:name])
        end

        if (params[:username] != nil)
            user1.update_attributes(username: params[:username])
        end

        if (params[:email] != nil)
            user1.update_attributes(email: params[:email])
        end

        if (params[:password] != nil)
            user1.update_attributes(password: params[:password])
        end

        if (params[:pfpURL] != nil)
            user1.update_attributes(pfpURL: params[:pfpURL])
        end

        if (params[:bannerURL] != nil)
            user1.update_attributes(bannerURL: params[:bannerURL])
        end

        user1.save
        user1.to_json
    end

    #delete user from database
    delete '/users/:username' do
        user1 = User.find(params[:userId])
        user1.posts.destroy
        user1.comments.destroy
        user1.flock.destroy
        user1.destroy
    end

    #find by username
    get '/user/:username' do
        user1 = User.find_by_username(params[:username])
        user1.to_json
    end

    #grab a users posts
    get '/user/:username/posts' do
        user1 = User.find_by_username(params[:username])
        user1.posts.to_json
    end
    # create a users post
    post '/user/:username/posts' do
        user1 = User.find_by_username(params[:username])
       Post.create(content: params[:content], likes: 0, user_id: user1.id, username: user1.username, pfpURL: user1.pfpURL)
    end

    #grab users followers
    get '/user/:username/flockers' do
        user1 = User.find_by_username(params[:username])
        output = user1.flockers
        output.to_json
    end

    #grab users following
    get '/user/:username/flockees' do
        user1 = User.find_by_username(params[:username])
        output = user1.flockees
        output.to_json
    end

    #grab all followings posts
    get '/user/:username/flock/posts' do
        user1 = User.find_by_username(params[:username])
        flock = user1.flockees
        output = [user1.posts]
        flock.each do |user|
            output << user.posts
        end
        output.to_json
    end

    #get a users comments
    get '/user/:username/comments' do
        user1 = User.find_by_username(params[:username])
        user1.comments.to_json
    end
end