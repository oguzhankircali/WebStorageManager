using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using System.Diagnostics;

namespace WebStorageManager
{
    public class Startup
    {
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            Debug.WriteLine(Directory.GetCurrentDirectory());
            app.UseStaticFiles();
            // app.UseStaticFiles(new StaticFileOptions()
            // {
            //     FileProvider = new PhysicalFileProvider(
            //                         Path.Combine(Directory.GetCurrentDirectory(), @"Scripts")),
            //                         RequestPath = new PathString("/Scripts")
            // });

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                //app.UseDefaultFiles();
            }

            app.Run(async (context) =>
            {
                await context.Response.WriteAsync("Hello World!");
                //context.Response.Redirect("/index.html");
            });
        }
    }
}
