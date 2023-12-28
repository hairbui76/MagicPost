namespace MagicPostApi.Enums;

public enum MiddlewareOrder
{
	VERIFY_TOKEN = 3,
	VERIFY_ROLE = 2,
	VERIFY_OWNER = 1,
	VERIFY_POINT_AND_ADMIN = 0
}