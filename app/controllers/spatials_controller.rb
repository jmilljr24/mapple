class SpatialsController < ApplicationController
  before_action :authenticate_user!

  def new
    @spatial = current_user.spatials.build
  end

  def create
    @spatial = current_user.spatials.build
    @spatial.lonlatheight = params[:coords]

    if @spatial.save
      redirect_to @spatial
    else
      puts "did not save"
    end
  end

  def show
  end
end
