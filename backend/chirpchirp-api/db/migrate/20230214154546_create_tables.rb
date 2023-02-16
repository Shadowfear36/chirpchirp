class CreateTables < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :name
      t.string :username
      t.string :email
      t.string :password
      t.string :pfpURL
      t.string :bannerURL
      t.integer :flock_id
      t.timestamps
    end

    create_table :posts do |t|
      t.string :content
      t.integer :likes
      t.integer :user_id
      t.string :username
      t.string :pfpURL
      t.timestamps
    end

    create_table :comments do |t|
      t.string :content
      t.integer :likes
      t.integer :user_id
      t.integer :post_id
      t.timestamps
    end

    create_table :flocks do |t|
      t.integer :flocker_id
      t.integer :flockee_id
      t.timestamps
    end
  end
end
