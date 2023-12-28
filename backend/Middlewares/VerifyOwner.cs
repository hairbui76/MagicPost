using System.Net;
using MagicPostApi.Enums;
using MagicPostApi.Models;
using MagicPostApi.Utils;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace MagicPostApi.Middlewares;
public class VerifyOwner : TypeFilterAttribute
{
	private class VerifyOwnerFilter : ActionFilterAttribute
	{
		private readonly string _idKeyName;
		public VerifyOwnerFilter(string idKeyName = "id")
		{
			_idKeyName = idKeyName;
		}
		public override void OnActionExecuting(ActionExecutingContext context)
		{
			User? user = (User?)context.HttpContext.Items["user"] ?? throw new AppException(HttpStatusCode.Unauthorized, "Unauthorized");
			var routeData = context.HttpContext.GetRouteData();
			if (!routeData.Values.ContainsKey(_idKeyName))
				throw new AppException("Inconsistant id key name (Provided: {0})", _idKeyName);
			var id = routeData.Values[_idKeyName]!.ToString();
			if (user.Id.ToString() != id)
				throw new AppException(HttpStatusCode.Forbidden, "You do not have permission to perform this action");
		}
	}
	public VerifyOwner(string idKeyName) : base(typeof(VerifyOwnerFilter))
	{
		Arguments = new object[] { idKeyName };
		Order = (int)MiddlewareOrder.VERIFY_OWNER;
	}
	public VerifyOwner() : base(typeof(VerifyOwnerFilter))
	{
		Order = (int)MiddlewareOrder.VERIFY_OWNER;
	}
}
