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
    public partial class login : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["mycon"].ToString());

        protected void btnLogin_Click(object sender, EventArgs e)
        {
            try
            {
                string UseriD = txtuserID.Text;
                string Pass = txtpassword.Text;

                con.Open();
                string qry = "SELECT User_ID FROM users_table WHERE user_NAME = '" + UseriD + "' AND user_PASSWORD = '" + Pass + "'";
                SqlCommand cmd = new SqlCommand(qry, con);
                SqlDataReader srd = cmd.ExecuteReader();
                if (srd.Read())
                {
                    Response.Redirect("./Expense Tracker/index.html");
                }
                else
                {
                    lblError.Text = "please check your user name and password";
                }

                con.Close();
            }
            catch (Exception ex)
            {

                throw;
                Response.Write(ex.Message);
            }
        }

    }
}