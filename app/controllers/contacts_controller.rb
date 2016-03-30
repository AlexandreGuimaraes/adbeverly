class ContactsController < ApplicationController
  def new
<<<<<<< HEAD
    @contact = Contact.new
  end

  def create
    @contact = Contact.new(contact_params)
    if @contact.save
      name = params[:contact][:name]
      email = params[:contact][:email]
      body = params[:contact][:comments]
      ContactMailer.contact_email(name, email, body).deliver
      flash[:success] = 'Message sent.'
      redirect_to new_contact_path
    else
      flash[:danger] = 'Error occurred, message has not been sent.'
      redirect_to new_contact_path
    end
  end

=======
  end
  
  def create
  end
>>>>>>> 5663bed9460607ef8ce9fd1272b15f5f13429fe4
end
