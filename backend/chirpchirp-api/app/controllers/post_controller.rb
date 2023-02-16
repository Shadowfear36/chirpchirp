class PostsController < ApplicationController

    #all posts
    get '/posts' do
        Post.all.order("created_at ASC").to_json
    end

    #get a post by id
    get '/posts/:post_id' do
        Post.find(params[:post_id]).to_json
    end

    # add a comment to a post
    post '/posts/:post_id' do
        Comment.create(content: params[:content], likes: params[:likes], user_id: params[:user_id], post_id: params[:post_id])
    end

    #patch a post

    patch '/posts/:post_id' do
        post1 = Post.find(params[:post_id])
        post1.update_attributes(likes: params[:likes])
    end
    
    #get a posts comments
    get '/posts/:post_id/comments' do
       post1 = Post.find(params[:post_id])
       post1.comments.to_json
    end

    #get all comments
    get '/comments' do
        Comment.all.to_json
    end

    #get top 50 trending posts
    get '/trending' do
        Post.all.order('likes DESC').to_json
    end
    #get posts by search term (fuzzy search)
    get '/posts/search/:searchterm' do
        search = params[:searchterm]
        Post.where("content like ?", '%' + search + '%').order('created_at DESC').to_json
    end

end

