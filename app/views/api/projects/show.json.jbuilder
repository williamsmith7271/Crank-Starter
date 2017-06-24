project = @project
 json.extract! project, :id, :title, :website, :description,
 :category_id, :end_date, :funding_goal
  json.creator project.creator.username
  json.project_img asset_path(project.project_img.url)
  json.funded project.rewards.map { |reward|
     reward.contributions.count * reward.amount
  }.reduce(:+)
  json.num_backers project.rewards.map { |reward|
     reward.contributions.count
  }.reduce(:+)
  json.rewards project.rewards do |reward|
    json.amount reward.amount
    json.description reward.description
    json.contributions reward.contributions
    json.backers reward.backers
    json.project reward.project
  end
