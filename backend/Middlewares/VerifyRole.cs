using System.Net;
using MagicPostApi.Enums;
using MagicPostApi.Models;
using MagicPostApi.Utils;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace MagicPostApi.Middlewares;
public class VerifyRoleAttribute : TypeFilterAttribute
{
	public VerifyRoleAttribute(Role role) : base(typeof(VerifyRoleFilter))
	{
		Arguments = new object[] { new Role[] { role } };
	}

	public VerifyRoleAttribute(Role[] roles) : base(typeof(VerifyRoleFilter))
	{
		Arguments = new object[] { roles };
	}
}

public class VerifyRoleFilter : ActionFilterAttribute
{
	private readonly Role[] _roles;


	public VerifyRoleFilter(Role[] roles)
	{
		_roles = roles;
	}

	public override void OnActionExecuting(ActionExecutingContext context)
	{
		User? user = (User?)context.HttpContext.Items["user"] ?? throw new AppException(HttpStatusCode.Unauthorized, "Unauthorized");
		if (!_roles.Contains(user.Role))
			throw new AppException(HttpStatusCode.Forbidden, "You do not have permission to perform this action");
	}
}
