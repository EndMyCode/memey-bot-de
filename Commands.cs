using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading.Tasks;
using CliWrap;
using Discord;
using Discord.Commands;
using Discord.WebSocket;
using Discord.Audio;

namespace DiscordBot
{
    public class Commands : ModuleBase<SocketCommandContext>
    {

        [Command("help")]
        [Summary("Sagt dir alle commands.")]
        public async Task Help()
        {
            var info = new EmbedFieldBuilder()
                .WithName("Infos")
                .WithValue("Falls ein Argument mehrere Wörter hat, packe es in Gänsefüsschen (Beispiel: ;nick @User \"Neuer Name\"")
                .WithIsInline(true);
            var command1 = new EmbedFieldBuilder()
                .WithName("help")
                .WithValue("Zeigt dir die Commands an.")
                .WithIsInline(true);
            var command2 = new EmbedFieldBuilder()
                .WithName("test")
                .WithValue("Testet den bot, sage etwas und er sollte das selbe zurück sagen.")
                .WithIsInline(true);
            var command3 = new EmbedFieldBuilder()
                .WithName("beleidigung")
                .WithValue("Beleidigt jemanden.")
                .WithIsInline(true);
            var command4 = new EmbedFieldBuilder()
                .WithName("nick (nickname)")
                .WithValue("Ändert den namen einer person. Bracuht die Namensänderungserlaubnis")
                .WithIsInline(true);
            var embed = new EmbedBuilder()
                .WithAuthor(Context.Client.CurrentUser)
                .AddField(command1)
                .AddField(command2)
                .AddField(command3)
                .Build();

            await ReplyAsync(embed: embed);


        }

        [Command("test")]
        [Summary("Falls der Bot nicht reagiert, benutze diesen Command um zu überprüfen ob er eingeschaltet ist. Nimmt Text als Argument.")]
        public Task TestAsync([Remainder][Summary("Der gesagte Text")] string echo)
            => ReplyAsync(echo);

        [Command("beleidigung")]
        [Summary("Beleidigt jemanden.")]
        public async Task BeleidigungAsync([Summary("Der beleidigte Nutzer")] SocketGuildUser user = null)
        {
            await user.SendMessageAsync($"{Context.Message.Author} hat mir gesagt dass ich dir sagen soll, du sollst dich ficken.");
        }

        [Command("nick")]
        [Summary("Ändert nickname")]
        [Alias("nickname")]
        [RequireUserPermission(GuildPermission.ChangeNickname)]
        public async Task NickAsync([Summary("Der zu ändernde Nutzer")] SocketGuildUser user = null, [Summary("Der neue Name")] string name = null)
        {
            await user.ModifyAsync(x =>
            {
                x.Nickname = name;
            });
        }
    }
}