namespace MagicPostApi.Utils;

using System.Globalization;
using System.Net;

public class AppException : Exception
{
	public HttpStatusCode Code { get; set; }
	public AppException() : base() { }

	public AppException(string message) : base(message) { }
	public AppException(HttpStatusCode _code, string message) : base(message)
	{
		Code = _code;
	}

	public AppException(string message, params object[] args)
			// Format with current culture (current language - e.g. en-US)
			: base(string.Format(CultureInfo.CurrentCulture, message, args)) { }
}