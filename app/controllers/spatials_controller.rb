class SpatialsController < ApplicationController
  before_action :authenticate_user!

  def create
    @spatial = current_user.spatials.build
    @spatial.lonlatheight = params[:coords]

    if @spatial.save

      respond_to do |format|
        format.html { redirect root_path }
        format.turbo_stream { flash.now[:notice] = "Position saved to database" }
      end
    else
      respond_to do |format|
        format.turbo_stream { flash.now[:alert] = "Lat and Long Required" }
      end
    end
  end

  def show
  end

  private

  def spatial
    @_spatial ||= Spatial.find(params[:spatial_id])
  end
end
