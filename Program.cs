﻿using System;
using Discord;
using Discord.Net;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Discord.WebSocket;
using Discord.Commands;
using System.Reflection;
using Microsoft.Extensions.DependencyInjection;
using YoutubeExplode;
using YoutubeExplode.Channels;
using System.Collections.Generic;

namespace DiscordBot
{
    public class Program
    {
        private DiscordSocketClient _client;
        public CommandService _commands;
        private IServiceProvider _services;

        public static void Main(string[] args)
            => new Program().RunBotAsync().GetAwaiter().GetResult();

        public async Task RunBotAsync()
        {
            var config = new DiscordSocketConfig
            {
                AlwaysDownloadUsers = true
            };

            _client = new DiscordSocketClient(config);
            _commands = new CommandService();

            _services = new ServiceCollection().AddSingleton(_client).AddSingleton(_commands).BuildServiceProvider();

            string token = "NzU4MjkzMTY1NTA0ODU2MDk0.X2s1iw.XiKgx2sH__Eo0WkJFcHnfF9upxc";

            _client.Log += _client_Log;

            await RegisterCommandsAsync();

            await _client.LoginAsync(TokenType.Bot, token);

            await _client.StartAsync();

            await Task.Delay(-1);
        }

        private Task _client_Log(LogMessage arg)
        {
            Console.WriteLine(arg);
            return Task.CompletedTask;
        }

        public async Task RegisterCommandsAsync()
        {
            _client.MessageReceived += HandleCommandAsync;
            await _commands.AddModulesAsync(Assembly.GetEntryAssembly(), _services);
        }

        private async Task HandleCommandAsync(SocketMessage arg)
        {
            var message = arg as SocketUserMessage;
            var context = new SocketCommandContext(_client, message);
            if (message.Author.IsBot) return;

            int argPos = 0;
            if(message.HasStringPrefix(";", ref argPos))
            {
                var result = await _commands.ExecuteAsync(context, argPos, _services);
                if (!result.IsSuccess)
                {
                    Console.WriteLine(result.ErrorReason);
                    await context.Channel.SendMessageAsync($"Ein Fehler ist aufgetreten. Fehlermeldung: {result.ErrorReason}");
                }
            }
            #region responses
            if (message.Content.Contains("bot") || message.Content.Contains("Bot")) {
                if (message.Content.Contains("scheisse") || message.Content.Contains("Scheisse"))
                {
                    if (message.Content.Contains("nicht")) return;
                    await context.Channel.SendMessageAsync($"Deine Mom ist Scheisse, {context.User.Username}");
                }
                if (message.Content.Contains("müll") || message.Content.Contains("Müll"))
                {
                    if (message.Content.Contains("nicht")) return;
                    await context.Channel.SendMessageAsync($"Deine Mom ist Müll, {context.User.Username}");
                }
                if (message.Content.Contains("suckt") || message.Content.Contains("Suckt"))
                {
                    if (message.Content.Contains("nicht")) return;
                    await context.Channel.SendMessageAsync($"Deine Mom suckt, {context.User.Username}");
                }
                if(message.Content.Contains("dreck") || message.Content.Contains("Dreck"))
                {
                    if (message.Content.Contains("nicht")) return;
                    await context.Channel.SendMessageAsync($"Deine Mom ist Dreck, {context.User.Username}");
                }
                if (message.Content.Contains("kacke") || message.Content.Contains("Kacke"))
                {
                    if (message.Content.Contains("nicht")) return;
                    await context.Channel.SendMessageAsync($"Deine Mom ist Kacke, {context.User.Username}");
                }
            }
            #endregion
        }
    }
}
