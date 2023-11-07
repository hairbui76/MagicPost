namespace MagicPostApi.Utils;

using AutoMapper;
using MagicPostApi.Models;

public class AutoMapperProfile : Profile
{
	private bool IgnoreNullAndEmptyString(object src, object dest, object prop)
	{
		// ignore both null && enpty string properties
		if (prop == null) return false;
		if (prop.GetType() == typeof(string) && string.IsNullOrEmpty((string)prop)) return false;

		return true;
	}
	public AutoMapperProfile()
	{
		// RegisterModel -> User
		CreateMap<RegisterModel, User>();
		// LoginModel -> User
		CreateMap<LoginModel, User>();
		// CreatePointModel -> Point
		CreateMap<CreatePointModel, Point>();
		// UpdatePointModel -> Point
		CreateMap<UpdatePointModel, Point>()
				.ForAllMembers(x => x.Condition(IgnoreNullAndEmptyString));
		// CreateOrderModel -> Order
		CreateMap<CreateOrderModel, Order>();
		// UpdateOrderModel -> Order
		CreateMap<UpdateOrderModel, Order>()
				.ForAllMembers(x => x.Condition(IgnoreNullAndEmptyString));
	}
}