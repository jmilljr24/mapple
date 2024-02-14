class SpatialsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_spatial, only: %i[show edit update destroy]

  def index
    @spatials = Spatials.all
  end

  def show
  end

  def new
    @spatial = Spatial.new
  end

  def edit
  end

  def create
    @spatial = current_user.spatials.build(spatial_params)
    # @spatial.lonlatheight = params[:coords]

    if @spatial.save

      respond_to do |format|
        format.html { redirect_to root_path, notice: "Tree Marker saved to database" }
        format.turbo_stream { flash.now[:notice] = "Tree Marker saved to database" }
      end
    else
      respond_to do |format|
        format.turbo_stream { flash.now[:alert] = "Lat and Long Required" }
      end
    end
  end

  def update
    respond_to do |format|
      if @spatial.update(spatial_params)
        format.html { redirect_to root_path, notice: "Tree Marker was successfully updated." }

      else
        format.html { render :edit, status: :unprocessable_entity }

      end
    end
  end

  def destroy
    @spatial.destroy!

    respond_to do |format|
      format.html { redirect_to root_path, notice: "Tree Marker was successfully deleted." }
      format.json { head :no_content }
    end
  end

  private

  def set_spatial
    @spatial = Spatial.find(params[:id])
  end

  def spatial_params
    params.require(:spatial).permit(:lonlatheight, :taps, :species, :user_id)
  end
end
