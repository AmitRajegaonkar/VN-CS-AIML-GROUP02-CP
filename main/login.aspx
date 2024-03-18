<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="login.aspx.cs" Inherits="main.login" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">    
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Expense Tracker</title>
    <link rel="stylesheet" href="./assest/css/register.css"/>
    <link rel="preconnect" href="https://fonts.googleapis.com"/>
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"/>

</head>
<body>
    <form id="form1" runat="server">
        <div>
            <div class="main">
        
                <div>
                    <div class="div2">
                        <img  src = "./assest/images/img.svg" alt="My Happy SVG"/>
                    </div>
                </div>
        

                <div class="div0">
                    <h1 class="">Welcome Back!</h1>
                    <h4>Try to save more </h4>                  
                        <p>User Name: </p>
                        <asp:TextBox  ID="txtuserID"  AutoComplete="off" CssClass="type" runat="server" placeholder="Enter Your Nmae"></asp:TextBox>

                        <p>Password: </p>
                        <asp:TextBox runat="server" ID="txtpassword"  AutoComplete="off" CssClass="type" placeholder="Enter Your Nmae"></asp:TextBox>
                        <asp:Button type="button" ID="btnLogin" runat="server" Text="Sign In" CssClass="but" OnClick="btnLogin_Click" />
                </div> 
        </div>
       
        <a class="typ6" >You did not have account?<a href="/register.aspx" class="typ7">Creat Account</a></a>
       

        <br />
        <asp:Label CssClass="type3"  ID="lblError" Text=""  runat="server"/>

        </div>
    </form>
</body>
</html>
