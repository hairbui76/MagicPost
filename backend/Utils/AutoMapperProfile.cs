namespace MagicPostApi.Utils;

using AutoMapper;
using MagicPostApi.Models;

public class AutoMapperProfile : Profile
{
	public AutoMapperProfile()
	{
		CreateMap<RegisterModel, User>();
		CreateMap<LoginModel, User>();
		CreateMap<CreatePointModel, Point>();
	}
}