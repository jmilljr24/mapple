class PagesController < ApplicationController
  before_action :authenticate_user!
  before_action :restrict_access

  def root
    @spatial = current_user.spatials.build
  end

  private

  def restrict_access
    redirect_to root_path unless current_user
  end
end
