require 'bundler'
Bundler.require

module AssetHelpers
  def asset_path(source)
    settings.sprockets.path(source, true, "assets")
  end
end

class Push < Sinatra::Base
  set :root, File.expand_path('../', __FILE__)
  set :sprockets, Sprockets::Environment.new(root)
  set :precompile, [ /\w+\.(?!js|css).+/, /application.(css|js)$/ ]
  # set :precompile, [ /.*/ ]
  set :assets_prefix, 'assets'
  set :assets_path, File.join(root, 'public', assets_prefix)
  set :views, File.join(root, 'app', 'views')
  
  configure do
    sprockets.append_path(File.join(root, 'app', 'assets', 'stylesheets'))
    sprockets.append_path(File.join(root, 'app', 'assets', 'javascripts'))
    sprockets.append_path(File.join(root, 'app', 'assets', 'images'))

    sprockets.context_class.instance_eval do
      include AssetHelpers
    end
  end
  
  helpers do
    include AssetHelpers
  end
  
  get "/" do
    slim :index
  end
end
