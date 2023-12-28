using System.Net;
using MagicPostApi.Enums;
using MagicPostApi.Models;
using MagicPostApi.Utils;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace MagicPostApi.Middlewares;
public class VerifyPointAndAdminAttribute : TypeFilterAttribute
{
	private class VerifyPointAndAdminFilter : ActionFilterAttribute
	{
		public override void OnActionExecuting(ActionExecutingContext context)
		{
			User? user = (User?)context.HttpContext.Items["user"] ?? throw new AppException(HttpStatusCode.Unauthorized, "Unauthorized");
			if (user.Role != Role.COMPANY_ADMINISTRATOR && user.PointId == null)
				throw new AppException(HttpStatusCode.Forbidden, "You do not have permission to perform this action");
		}
	}
	public VerifyPointAndAdminAttribute() : base(typeof(VerifyPointAndAdminFilter))
	{
		Order = (int)MiddlewareOrder.VERIFY_POINT_AND_ADMIN;
	}
}


