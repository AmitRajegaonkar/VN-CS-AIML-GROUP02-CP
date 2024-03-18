using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace main
{
    public partial class register : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void btnreg_Click(object sender, EventArgs e)
        {
            string connectionString = ConfigurationManager.ConnectionStrings["mycon"].ToString();

            using (SqlConnection con = new SqlConnection(connectionString))
            {
                con.Open();

                string UseriD = txtUserID.Text;
                string MailiD = txtMail.Text;
                string passiD = txtPassword.Text;

                if (!string.IsNullOrEmpty(UseriD) && !string.IsNullOrEmpty(MailiD) && !string.IsNullOrEmpty(passiD))
                {
                    // Check if the user already exists
                    SqlCommand checkUserCmd = new SqlCommand("SELECT COUNT(*) FROM users_table WHERE user_NAME = @userId OR user_MAIL = @email", con);
                    checkUserCmd.Parameters.AddWithValue("@userId", UseriD);
                    checkUserCmd.Parameters.AddWithValue("@email", MailiD);

                    int existingUsersCount = (int)checkUserCmd.ExecuteScalar();

                    if (existingUsersCount == 0)
                    {
                        // Insert the user if not already exists
                        SqlCommand insertUserCmd = new SqlCommand("INSERT INTO users_table (user_NAME, user_MAIL, user_PASSWORD) VALUES (@userId, @email, @Password)", con);
                        insertUserCmd.Parameters.AddWithValue("@userId", UseriD);
                        insertUserCmd.Parameters.AddWithValue("@email", MailiD);
                        insertUserCmd.Parameters.AddWithValue("@Password", passiD);

                        // Execute the SQL command
                        insertUserCmd.ExecuteNonQuery();

                        // Close the connection after executing the command
                        con.Close();

                        // Redirect after executing the command
                        Response.Redirect("./login.aspx");
                    }
                    else
                    {
                        lblError.Text = "User already exists with the provided user name or email.";
                    }
                }
                else
                {
                    lblError.Text = "Please provide a user name, email, and password.";
                }
            }



        }


    }
}