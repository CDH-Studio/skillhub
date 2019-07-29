require "json"
require "linguist"
require "rugged"

if ARGV.length == 0
    puts "Missing repo path argument"
    exit 1
end

path = ARGV[0]

rugged = Rugged::Repository.new(path)
repo = Linguist::Repository.new(rugged, rugged.head.target_id)

puts JSON.dump(repo.breakdown_by_file)
