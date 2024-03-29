// src/lib/environment.ts
import path from "path";
import fs from "fs-extra";
import minimist from "minimist";
import _ from "lodash";
var cmdArgs = minimist(process.argv.slice(2));
var envVars = process.env;
var Environment = class {
  /** 命令行参数 */
  cmdArgs;
  /** 环境变量 */
  envVars;
  /** 环境名称 */
  env;
  /** 服务名称 */
  name;
  /** 服务地址 */
  host;
  /** 服务端口 */
  port;
  /** 包参数 */
  package;
  constructor(options = {}) {
    const { cmdArgs: cmdArgs2, envVars: envVars2, package: _package } = options;
    this.cmdArgs = cmdArgs2;
    this.envVars = envVars2;
    this.env = _.defaultTo(cmdArgs2.env || envVars2.GAME_SERVER_ENV, "dev");
    this.name = _.defaultTo(cmdArgs2.name || envVars2.GAME_SERVER_NAME, "game-server");
    this.host = _.defaultTo(cmdArgs2.host || envVars2.GAME_SERVER_HOST, "0.0.0.0");
    this.port = Number(_.defaultTo(cmdArgs2.port || envVars2.GAME_SERVER_PORT, 5566));
    this.package = _package;
  }
};
var environment_default = new Environment({
  cmdArgs,
  envVars,
  package: JSON.parse(fs.readFileSync(path.join(path.resolve(), "package.json")).toString())
});

// src/lib/configs/service-config.ts
import path3 from "path";
import fs3 from "fs-extra";
import yaml from "yaml";
import _3 from "lodash";

// src/lib/util.ts
import os from "os";
import path2 from "path";
import crypto from "crypto";
import { Readable, Writable } from "stream";
import "colors";
import mime from "mime";
import fs2 from "fs-extra";
import { v1 as uuid } from "uuid";
import { format as dateFormat } from "date-fns";
import CRC32 from "crc-32";
import randomstring from "randomstring";
import _2 from "lodash";
import { CronJob } from "cron";
import { SocksProxyAgent } from "socks-proxy-agent";
import { HttpsProxyAgent } from "https-proxy-agent";

// src/lib/http-status-codes.ts
var http_status_codes_default = {
  CONTINUE: 100,
  //客户端应当继续发送请求。这个临时响应是用来通知客户端它的部分请求已经被服务器接收，且仍未被拒绝。客户端应当继续发送请求的剩余部分，或者如果请求已经完成，忽略这个响应。服务器必须在请求完成后向客户端发送一个最终响应
  SWITCHING_PROTOCOLS: 101,
  //服务器已经理解了客户端的请求，并将通过Upgrade 消息头通知客户端采用不同的协议来完成这个请求。在发送完这个响应最后的空行后，服务器将会切换到在Upgrade 消息头中定义的那些协议。只有在切换新的协议更有好处的时候才应该采取类似措施。例如，切换到新的HTTP 版本比旧版本更有优势，或者切换到一个实时且同步的协议以传送利用此类特性的资源
  PROCESSING: 102,
  //处理将被继续执行
  OK: 200,
  //请求已成功，请求所希望的响应头或数据体将随此响应返回
  CREATED: 201,
  //请求已经被实现，而且有一个新的资源已经依据请求的需要而建立，且其 URI 已经随Location 头信息返回。假如需要的资源无法及时建立的话，应当返回 '202 Accepted'
  ACCEPTED: 202,
  //服务器已接受请求，但尚未处理。正如它可能被拒绝一样，最终该请求可能会也可能不会被执行。在异步操作的场合下，没有比发送这个状态码更方便的做法了。返回202状态码的响应的目的是允许服务器接受其他过程的请求（例如某个每天只执行一次的基于批处理的操作），而不必让客户端一直保持与服务器的连接直到批处理操作全部完成。在接受请求处理并返回202状态码的响应应当在返回的实体中包含一些指示处理当前状态的信息，以及指向处理状态监视器或状态预测的指针，以便用户能够估计操作是否已经完成
  NON_AUTHORITATIVE_INFO: 203,
  //服务器已成功处理了请求，但返回的实体头部元信息不是在原始服务器上有效的确定集合，而是来自本地或者第三方的拷贝。当前的信息可能是原始版本的子集或者超集。例如，包含资源的元数据可能导致原始服务器知道元信息的超级。使用此状态码不是必须的，而且只有在响应不使用此状态码便会返回200 OK的情况下才是合适的
  NO_CONTENT: 204,
  //服务器成功处理了请求，但不需要返回任何实体内容，并且希望返回更新了的元信息。响应可能通过实体头部的形式，返回新的或更新后的元信息。如果存在这些头部信息，则应当与所请求的变量相呼应。如果客户端是浏览器的话，那么用户浏览器应保留发送了该请求的页面，而不产生任何文档视图上的变化，即使按照规范新的或更新后的元信息应当被应用到用户浏览器活动视图中的文档。由于204响应被禁止包含任何消息体，因此它始终以消息头后的第一个空行结尾
  RESET_CONTENT: 205,
  //服务器成功处理了请求，且没有返回任何内容。但是与204响应不同，返回此状态码的响应要求请求者重置文档视图。该响应主要是被用于接受用户输入后，立即重置表单，以便用户能够轻松地开始另一次输入。与204响应一样，该响应也被禁止包含任何消息体，且以消息头后的第一个空行结束
  PARTIAL_CONTENT: 206,
  //服务器已经成功处理了部分 GET 请求。类似于FlashGet或者迅雷这类的HTTP下载工具都是使用此类响应实现断点续传或者将一个大文档分解为多个下载段同时下载。该请求必须包含 Range 头信息来指示客户端希望得到的内容范围，并且可能包含 If-Range 来作为请求条件。响应必须包含如下的头部域：Content-Range 用以指示本次响应中返回的内容的范围；如果是Content-Type为multipart/byteranges的多段下载，则每一段multipart中都应包含Content-Range域用以指示本段的内容范围。假如响应中包含Content-Length，那么它的数值必须匹配它返回的内容范围的真实字节数。Date和ETag或Content-Location，假如同样的请求本应该返回200响应。Expires, Cache-Control，和/或 Vary，假如其值可能与之前相同变量的其他响应对应的值不同的话。假如本响应请求使用了 If-Range 强缓存验证，那么本次响应不应该包含其他实体头；假如本响应的请求使用了 If-Range 弱缓存验证，那么本次响应禁止包含其他实体头；这避免了缓存的实体内容和更新了的实体头信息之间的不一致。否则，本响应就应当包含所有本应该返回200响应中应当返回的所有实体头部域。假如 ETag 或 Latest-Modified 头部不能精确匹配的话，则客户端缓存应禁止将206响应返回的内容与之前任何缓存过的内容组合在一起。任何不支持 Range 以及 Content-Range 头的缓存都禁止缓存206响应返回的内容
  MULTIPLE_STATUS: 207,
  //代表之后的消息体将是一个XML消息，并且可能依照之前子请求数量的不同，包含一系列独立的响应代码
  MULTIPLE_CHOICES: 300,
  //被请求的资源有一系列可供选择的回馈信息，每个都有自己特定的地址和浏览器驱动的商议信息。用户或浏览器能够自行选择一个首选的地址进行重定向。除非这是一个HEAD请求，否则该响应应当包括一个资源特性及地址的列表的实体，以便用户或浏览器从中选择最合适的重定向地址。这个实体的格式由Content-Type定义的格式所决定。浏览器可能根据响应的格式以及浏览器自身能力，自动作出最合适的选择。当然，RFC 2616规范并没有规定这样的自动选择该如何进行。如果服务器本身已经有了首选的回馈选择，那么在Location中应当指明这个回馈的 URI；浏览器可能会将这个 Location 值作为自动重定向的地址。此外，除非额外指定，否则这个响应也是可缓存的
  MOVED_PERMANENTLY: 301,
  //被请求的资源已永久移动到新位置，并且将来任何对此资源的引用都应该使用本响应返回的若干个URI之一。如果可能，拥有链接编辑功能的客户端应当自动把请求的地址修改为从服务器反馈回来的地址。除非额外指定，否则这个响应也是可缓存的。新的永久性的URI应当在响应的Location域中返回。除非这是一个HEAD请求，否则响应的实体中应当包含指向新的URI的超链接及简短说明。如果这不是一个GET或者HEAD请求，因此浏览器禁止自动进行重定向，除非得到用户的确认，因为请求的条件可能因此发生变化。注意：对于某些使用 HTTP/1.0 协议的浏览器，当它们发送的POST请求得到了一个301响应的话，接下来的重定向请求将会变成GET方式
  FOUND: 302,
  //请求的资源现在临时从不同的URI响应请求。由于这样的重定向是临时的，客户端应当继续向原有地址发送以后的请求。只有在Cache-Control或Expires中进行了指定的情况下，这个响应才是可缓存的。新的临时性的URI应当在响应的 Location 域中返回。除非这是一个HEAD请求，否则响应的实体中应当包含指向新的URI的超链接及简短说明。如果这不是一个GET或者HEAD请求，那么浏览器禁止自动进行重定向，除非得到用户的确认，因为请求的条件可能因此发生变化。注意：虽然RFC 1945和RFC 2068规范不允许客户端在重定向时改变请求的方法，但是很多现存的浏览器将302响应视作为303响应，并且使用GET方式访问在Location中规定的URI，而无视原先请求的方法。状态码303和307被添加了进来，用以明确服务器期待客户端进行何种反应
  SEE_OTHER: 303,
  //对应当前请求的响应可以在另一个URI上被找到，而且客户端应当采用 GET 的方式访问那个资源。这个方法的存在主要是为了允许由脚本激活的POST请求输出重定向到一个新的资源。这个新的 URI 不是原始资源的替代引用。同时，303响应禁止被缓存。当然，第二个请求（重定向）可能被缓存。新的 URI 应当在响应的Location域中返回。除非这是一个HEAD请求，否则响应的实体中应当包含指向新的URI的超链接及简短说明。注意：许多 HTTP/1.1 版以前的浏览器不能正确理解303状态。如果需要考虑与这些浏览器之间的互动，302状态码应该可以胜任，因为大多数的浏览器处理302响应时的方式恰恰就是上述规范要求客户端处理303响应时应当做的
  NOT_MODIFIED: 304,
  //如果客户端发送了一个带条件的GET请求且该请求已被允许，而文档的内容（自上次访问以来或者根据请求的条件）并没有改变，则服务器应当返回这个状态码。304响应禁止包含消息体，因此始终以消息头后的第一个空行结尾。该响应必须包含以下的头信息：Date，除非这个服务器没有时钟。假如没有时钟的服务器也遵守这些规则，那么代理服务器以及客户端可以自行将Date字段添加到接收到的响应头中去（正如RFC 2068中规定的一样），缓存机制将会正常工作。ETag或 Content-Location，假如同样的请求本应返回200响应。Expires, Cache-Control，和/或Vary，假如其值可能与之前相同变量的其他响应对应的值不同的话。假如本响应请求使用了强缓存验证，那么本次响应不应该包含其他实体头；否则（例如，某个带条件的 GET 请求使用了弱缓存验证），本次响应禁止包含其他实体头；这避免了缓存了的实体内容和更新了的实体头信息之间的不一致。假如某个304响应指明了当前某个实体没有缓存，那么缓存系统必须忽视这个响应，并且重复发送不包含限制条件的请求。假如接收到一个要求更新某个缓存条目的304响应，那么缓存系统必须更新整个条目以反映所有在响应中被更新的字段的值
  USE_PROXY: 305,
  //被请求的资源必须通过指定的代理才能被访问。Location域中将给出指定的代理所在的URI信息，接收者需要重复发送一个单独的请求，通过这个代理才能访问相应资源。只有原始服务器才能建立305响应。注意：RFC 2068中没有明确305响应是为了重定向一个单独的请求，而且只能被原始服务器建立。忽视这些限制可能导致严重的安全后果
  UNUSED: 306,
  //在最新版的规范中，306状态码已经不再被使用
  TEMPORARY_REDIRECT: 307,
  //请求的资源现在临时从不同的URI 响应请求。由于这样的重定向是临时的，客户端应当继续向原有地址发送以后的请求。只有在Cache-Control或Expires中进行了指定的情况下，这个响应才是可缓存的。新的临时性的URI 应当在响应的Location域中返回。除非这是一个HEAD请求，否则响应的实体中应当包含指向新的URI 的超链接及简短说明。因为部分浏览器不能识别307响应，因此需要添加上述必要信息以便用户能够理解并向新的 URI 发出访问请求。如果这不是一个GET或者HEAD请求，那么浏览器禁止自动进行重定向，除非得到用户的确认，因为请求的条件可能因此发生变化
  BAD_REQUEST: 400,
  //1.语义有误，当前请求无法被服务器理解。除非进行修改，否则客户端不应该重复提交这个请求 2.请求参数有误
  UNAUTHORIZED: 401,
  //当前请求需要用户验证。该响应必须包含一个适用于被请求资源的 WWW-Authenticate 信息头用以询问用户信息。客户端可以重复提交一个包含恰当的 Authorization 头信息的请求。如果当前请求已经包含了 Authorization 证书，那么401响应代表着服务器验证已经拒绝了那些证书。如果401响应包含了与前一个响应相同的身份验证询问，且浏览器已经至少尝试了一次验证，那么浏览器应当向用户展示响应中包含的实体信息，因为这个实体信息中可能包含了相关诊断信息。参见RFC 2617
  PAYMENT_REQUIRED: 402,
  //该状态码是为了将来可能的需求而预留的
  FORBIDDEN: 403,
  //服务器已经理解请求，但是拒绝执行它。与401响应不同的是，身份验证并不能提供任何帮助，而且这个请求也不应该被重复提交。如果这不是一个HEAD请求，而且服务器希望能够讲清楚为何请求不能被执行，那么就应该在实体内描述拒绝的原因。当然服务器也可以返回一个404响应，假如它不希望让客户端获得任何信息
  NOT_FOUND: 404,
  //请求失败，请求所希望得到的资源未被在服务器上发现。没有信息能够告诉用户这个状况到底是暂时的还是永久的。假如服务器知道情况的话，应当使用410状态码来告知旧资源因为某些内部的配置机制问题，已经永久的不可用，而且没有任何可以跳转的地址。404这个状态码被广泛应用于当服务器不想揭示到底为何请求被拒绝或者没有其他适合的响应可用的情况下
  METHOD_NOT_ALLOWED: 405,
  //请求行中指定的请求方法不能被用于请求相应的资源。该响应必须返回一个Allow 头信息用以表示出当前资源能够接受的请求方法的列表。鉴于PUT，DELETE方法会对服务器上的资源进行写操作，因而绝大部分的网页服务器都不支持或者在默认配置下不允许上述请求方法，对于此类请求均会返回405错误
  NO_ACCEPTABLE: 406,
  //请求的资源的内容特性无法满足请求头中的条件，因而无法生成响应实体。除非这是一个 HEAD 请求，否则该响应就应当返回一个包含可以让用户或者浏览器从中选择最合适的实体特性以及地址列表的实体。实体的格式由Content-Type头中定义的媒体类型决定。浏览器可以根据格式及自身能力自行作出最佳选择。但是，规范中并没有定义任何作出此类自动选择的标准
  PROXY_AUTHENTICATION_REQUIRED: 407,
  //与401响应类似，只不过客户端必须在代理服务器上进行身份验证。代理服务器必须返回一个Proxy-Authenticate用以进行身份询问。客户端可以返回一个Proxy-Authorization信息头用以验证。参见RFC 2617
  REQUEST_TIMEOUT: 408,
  //请求超时。客户端没有在服务器预备等待的时间内完成一个请求的发送。客户端可以随时再次提交这一请求而无需进行任何更改
  CONFLICT: 409,
  //由于和被请求的资源的当前状态之间存在冲突，请求无法完成。这个代码只允许用在这样的情况下才能被使用：用户被认为能够解决冲突，并且会重新提交新的请求。该响应应当包含足够的信息以便用户发现冲突的源头。冲突通常发生于对PUT请求的处理中。例如，在采用版本检查的环境下，某次PUT提交的对特定资源的修改请求所附带的版本信息与之前的某个（第三方）请求向冲突，那么此时服务器就应该返回一个409错误，告知用户请求无法完成。此时，响应实体中很可能会包含两个冲突版本之间的差异比较，以便用户重新提交归并以后的新版本
  GONE: 410,
  //被请求的资源在服务器上已经不再可用，而且没有任何已知的转发地址。这样的状况应当被认为是永久性的。如果可能，拥有链接编辑功能的客户端应当在获得用户许可后删除所有指向这个地址的引用。如果服务器不知道或者无法确定这个状况是否是永久的，那么就应该使用404状态码。除非额外说明，否则这个响应是可缓存的。410响应的目的主要是帮助网站管理员维护网站，通知用户该资源已经不再可用，并且服务器拥有者希望所有指向这个资源的远端连接也被删除。这类事件在限时、增值服务中很普遍。同样，410响应也被用于通知客户端在当前服务器站点上，原本属于某个个人的资源已经不再可用。当然，是否需要把所有永久不可用的资源标记为'410 Gone'，以及是否需要保持此标记多长时间，完全取决于服务器拥有者
  LENGTH_REQUIRED: 411,
  //服务器拒绝在没有定义Content-Length头的情况下接受请求。在添加了表明请求消息体长度的有效Content-Length头之后，客户端可以再次提交该请求 
  PRECONDITION_FAILED: 412,
  //服务器在验证在请求的头字段中给出先决条件时，没能满足其中的一个或多个。这个状态码允许客户端在获取资源时在请求的元信息（请求头字段数据）中设置先决条件，以此避免该请求方法被应用到其希望的内容以外的资源上
  REQUEST_ENTITY_TOO_LARGE: 413,
  //服务器拒绝处理当前请求，因为该请求提交的实体数据大小超过了服务器愿意或者能够处理的范围。此种情况下，服务器可以关闭连接以免客户端继续发送此请求。如果这个状况是临时的，服务器应当返回一个 Retry-After 的响应头，以告知客户端可以在多少时间以后重新尝试
  REQUEST_URI_TOO_LONG: 414,
  //请求的URI长度超过了服务器能够解释的长度，因此服务器拒绝对该请求提供服务。这比较少见，通常的情况包括：本应使用POST方法的表单提交变成了GET方法，导致查询字符串（Query String）过长。重定向URI “黑洞”，例如每次重定向把旧的URI作为新的URI的一部分，导致在若干次重定向后URI超长。客户端正在尝试利用某些服务器中存在的安全漏洞攻击服务器。这类服务器使用固定长度的缓冲读取或操作请求的URI，当GET后的参数超过某个数值后，可能会产生缓冲区溢出，导致任意代码被执行[1]。没有此类漏洞的服务器，应当返回414状态码
  UNSUPPORTED_MEDIA_TYPE: 415,
  //对于当前请求的方法和所请求的资源，请求中提交的实体并不是服务器中所支持的格式，因此请求被拒绝
  REQUESTED_RANGE_NOT_SATISFIABLE: 416,
  //如果请求中包含了Range请求头，并且Range中指定的任何数据范围都与当前资源的可用范围不重合，同时请求中又没有定义If-Range请求头，那么服务器就应当返回416状态码。假如Range使用的是字节范围，那么这种情况就是指请求指定的所有数据范围的首字节位置都超过了当前资源的长度。服务器也应当在返回416状态码的同时，包含一个Content-Range实体头，用以指明当前资源的长度。这个响应也被禁止使用multipart/byteranges作为其 Content-Type
  EXPECTION_FAILED: 417,
  //在请求头Expect中指定的预期内容无法被服务器满足，或者这个服务器是一个代理服务器，它有明显的证据证明在当前路由的下一个节点上，Expect的内容无法被满足
  TOO_MANY_CONNECTIONS: 421,
  //从当前客户端所在的IP地址到服务器的连接数超过了服务器许可的最大范围。通常，这里的IP地址指的是从服务器上看到的客户端地址（比如用户的网关或者代理服务器地址）。在这种情况下，连接数的计算可能涉及到不止一个终端用户
  UNPROCESSABLE_ENTITY: 422,
  //请求格式正确，但是由于含有语义错误，无法响应
  FAILED_DEPENDENCY: 424,
  //由于之前的某个请求发生的错误，导致当前请求失败，例如PROPPATCH
  UNORDERED_COLLECTION: 425,
  //在WebDav Advanced Collections 草案中定义，但是未出现在《WebDAV 顺序集协议》（RFC 3658）中
  UPGRADE_REQUIRED: 426,
  //客户端应当切换到TLS/1.0
  RETRY_WITH: 449,
  //由微软扩展，代表请求应当在执行完适当的操作后进行重试
  INTERNAL_SERVER_ERROR: 500,
  //服务器遇到了一个未曾预料的状况，导致了它无法完成对请求的处理。一般来说，这个问题都会在服务器的程序码出错时出现
  NOT_IMPLEMENTED: 501,
  //服务器不支持当前请求所需要的某个功能。当服务器无法识别请求的方法，并且无法支持其对任何资源的请求
  BAD_GATEWAY: 502,
  //作为网关或者代理工作的服务器尝试执行请求时，从上游服务器接收到无效的响应
  SERVICE_UNAVAILABLE: 503,
  //由于临时的服务器维护或者过载，服务器当前无法处理请求。这个状况是临时的，并且将在一段时间以后恢复。如果能够预计延迟时间，那么响应中可以包含一个 Retry-After 头用以标明这个延迟时间。如果没有给出这个 Retry-After 信息，那么客户端应当以处理500响应的方式处理它。注意：503状态码的存在并不意味着服务器在过载的时候必须使用它。某些服务器只不过是希望拒绝客户端的连接
  GATEWAY_TIMEOUT: 504,
  //作为网关或者代理工作的服务器尝试执行请求时，未能及时从上游服务器（URI标识出的服务器，例如HTTP、FTP、LDAP）或者辅助服务器（例如DNS）收到响应。注意：某些代理服务器在DNS查询超时时会返回400或者500错误
  HTTP_VERSION_NOT_SUPPORTED: 505,
  //服务器不支持，或者拒绝支持在请求中使用的HTTP版本。这暗示着服务器不能或不愿使用与客户端相同的版本。响应中应当包含一个描述了为何版本不被支持以及服务器支持哪些协议的实体
  VARIANT_ALSO_NEGOTIATES: 506,
  //服务器存在内部配置错误：被请求的协商变元资源被配置为在透明内容协商中使用自己，因此在一个协商处理中不是一个合适的重点
  INSUFFICIENT_STORAGE: 507,
  //服务器无法存储完成请求所必须的内容。这个状况被认为是临时的
  BANDWIDTH_LIMIT_EXCEEDED: 509,
  //服务器达到带宽限制。这不是一个官方的状态码，但是仍被广泛使用
  NOT_EXTENDED: 510
  //获取资源所需要的策略并没有没满足
};

// src/lib/util.ts
var LOGO_TEXT = Buffer.from("ICAgX19fX19fXyBfICAgX19fX19fICBfX19fX19fICAgX18gIF9fX19fX19fX19fICBfXwogIC8gX18vIF8gfCB8IC8gLyBfXy8gLyBfXy8gXyB8IC8gIHwvICAvICBfLyAvXCBcLyAvCiBfXCBcLyBfXyB8IHwvIC8gXy8gIC8gXy8vIF9fIHwvIC98Xy8gLy8gLy8gL19fXCAgLyAKL19fXy9fLyB8X3xfX18vX19fLyAvXy8gL18vIHxfL18vICAvXy9fX18vX19fXy8vXy8gIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg", "base64").toString();
var autoIdMap = /* @__PURE__ */ new Map();
var util = {
  is2DArrays(value) {
    return _2.isArray(value) && (!value[0] || _2.isArray(value[0]) && _2.isArray(value[value.length - 1]));
  },
  uuid: (separator = true) => separator ? uuid() : uuid().replace(/\-/g, ""),
  autoId: (prefix = "") => {
    let index = autoIdMap.get(prefix);
    if (index > 999999)
      index = 0;
    autoIdMap.set(prefix, (index || 0) + 1);
    return `${prefix}${index || 1}`;
  },
  ignoreJSONParse(value) {
    const result = _2.attempt(() => JSON.parse(value));
    if (_2.isError(result))
      return null;
    return result;
  },
  generateRandomString(options) {
    return randomstring.generate(options);
  },
  getResponseContentType(value) {
    return value.headers ? value.headers["content-type"] || value.headers["Content-Type"] : null;
  },
  mimeToExtension(value) {
    let extension = mime.getExtension(value);
    if (extension == "mpga")
      return "mp3";
    return extension;
  },
  extractURLExtension(value) {
    const extname = path2.extname(new URL(value).pathname);
    return extname.substring(1).toLowerCase();
  },
  createCronJob(cronPatterns, callback) {
    if (!_2.isFunction(callback))
      throw new Error("callback must be an Function");
    return new CronJob(cronPatterns, () => callback(), null, false, "Asia/Shanghai");
  },
  createProxyAgent(options) {
    const { enable, protocol, host, port } = options;
    if (enable === false)
      return null;
    switch (protocol) {
      case "socks5":
        return new SocksProxyAgent(`${protocol}://${host}:${port}`);
      case "http":
      case "https":
        return new HttpsProxyAgent(`${protocol}://${host}:${port}`);
      default:
        throw new Error(`protocol ${protocol} is not supported`);
    }
  },
  getDateString(format = "yyyy-MM-dd", date = /* @__PURE__ */ new Date()) {
    return dateFormat(date, format);
  },
  getIPAddressesByIPv4() {
    const interfaces = os.networkInterfaces();
    const addresses = [];
    for (let name in interfaces) {
      const networks = interfaces[name];
      const results = networks.filter((network) => network.family === "IPv4" && network.address !== "127.0.0.1" && !network.internal);
      if (results[0] && results[0].address)
        addresses.push(results[0].address);
    }
    return addresses;
  },
  getMACAddressesByIPv4() {
    const interfaces = os.networkInterfaces();
    const addresses = [];
    for (let name in interfaces) {
      const networks = interfaces[name];
      const results = networks.filter((network) => network.family === "IPv4" && network.address !== "127.0.0.1" && !network.internal);
      if (results[0] && results[0].mac)
        addresses.push(results[0].mac);
    }
    return addresses;
  },
  buildDataBASE64(type, ext, buffer) {
    return `data:${type}/${ext.replace("jpg", "jpeg")};base64,${buffer.toString("base64")}`;
  },
  isLinux() {
    return os.platform() !== "win32";
  },
  isIPAddress(value) {
    return _2.isString(value) && (/^((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)$/.test(value) || /\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*/.test(value));
  },
  isPort(value) {
    return _2.isNumber(value) && value > 0 && value < 65536;
  },
  isReadStream(value) {
    return value && (value instanceof Readable || "readable" in value || value.readable);
  },
  isWriteStream(value) {
    return value && (value instanceof Writable || "writable" in value || value.writable);
  },
  isHttpStatusCode(value) {
    return _2.isNumber(value) && Object.values(http_status_codes_default).includes(value);
  },
  isURL(value) {
    return !_2.isUndefined(value) && /^(http|https)/.test(value);
  },
  isSrc(value) {
    return !_2.isUndefined(value) && /^\/.+\.[0-9a-zA-Z]+(\?.+)?$/.test(value);
  },
  isBASE64(value) {
    return !_2.isUndefined(value) && /^[a-zA-Z0-9\/\+]+(=?)+$/.test(value);
  },
  isBASE64Image(value) {
    return /^data:image/.test(value);
  },
  extractBASE64ImageFormat(value) {
    const match = value.trim().match(/^data:image\/(.+);base64,/);
    if (!match)
      return null;
    return match[1];
  },
  removeBASE64ImageHeader(value) {
    return value.replace(/^data:image\/(.+);base64,/, "");
  },
  isDataString(value) {
    return /^(base64|json):/.test(value);
  },
  isStringNumber(value) {
    return _2.isFinite(Number(value));
  },
  isUnixTimestamp(value) {
    return /^[0-9]{10}$/.test(`${value}`);
  },
  isTimestamp(value) {
    return /^[0-9]{13}$/.test(`${value}`);
  },
  isEmail(value) {
    return /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(value);
  },
  isAsyncFunction(value) {
    return Object.prototype.toString.call(value) === "[object AsyncFunction]";
  },
  async isAPNG(filePath) {
    let head;
    const readStream = fs2.createReadStream(filePath, { start: 37, end: 40 });
    const readPromise = new Promise((resolve, reject) => {
      readStream.once("end", resolve);
      readStream.once("error", reject);
    });
    readStream.once("data", (data) => head = data);
    await readPromise;
    return head.compare(Buffer.from([97, 99, 84, 76])) === 0;
  },
  unixTimestamp() {
    return parseInt(`${Date.now() / 1e3}`);
  },
  timestamp() {
    return Date.now();
  },
  urlJoin(...values) {
    let url = "";
    for (let i = 0; i < values.length; i++)
      url += `${i > 0 ? "/" : ""}${values[i].replace(/^\/*/, "").replace(/\/*$/, "")}`;
    return url;
  },
  millisecondsToHmss(milliseconds) {
    if (_2.isString(milliseconds))
      return milliseconds;
    milliseconds = parseInt(milliseconds);
    const sec = Math.floor(milliseconds / 1e3);
    const hours = Math.floor(sec / 3600);
    const minutes = Math.floor((sec - hours * 3600) / 60);
    const seconds = sec - hours * 3600 - minutes * 60;
    const ms = milliseconds % 6e4 - seconds * 1e3;
    return `${hours > 9 ? hours : "0" + hours}:${minutes > 9 ? minutes : "0" + minutes}:${seconds > 9 ? seconds : "0" + seconds}.${ms}`;
  },
  millisecondsToTimeString(milliseconds) {
    if (milliseconds < 1e3)
      return `${milliseconds}ms`;
    if (milliseconds < 6e4)
      return `${parseFloat((milliseconds / 1e3).toFixed(2))}s`;
    return `${Math.floor(milliseconds / 1e3 / 60)}m${Math.floor(milliseconds / 1e3 % 60)}s`;
  },
  rgbToHex(r, g, b) {
    return ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  },
  hexToRgb(hex) {
    const value = parseInt(hex.replace(/^#/, ""), 16);
    return [value >> 16 & 255, value >> 8 & 255, value & 255];
  },
  md5(value) {
    return crypto.createHash("md5").update(value).digest("hex");
  },
  crc32(value) {
    return _2.isBuffer(value) ? CRC32.buf(value) : CRC32.str(value);
  },
  arrayParse(value) {
    return _2.isArray(value) ? value : [value];
  },
  printLogo() {
    console.log(LOGO_TEXT["brightBlue"]);
  },
  booleanParse(value) {
    return value === "true" || value === true ? true : false;
  },
  encodeBASE64(value) {
    return Buffer.from(value).toString("base64");
  },
  decodeBASE64(value) {
    return Buffer.from(value, "base64").toString();
  }
};
var util_default = util;

// src/lib/configs/service-config.ts
var CONFIG_PATH = path3.join(path3.resolve(), "configs/", environment_default.env, "/service.yml");
var ServiceConfig = class _ServiceConfig {
  /** 服务名称 */
  name;
  /** @type {string} 服务绑定主机地址 */
  host;
  /** @type {number} 服务绑定端口 */
  port;
  /** @type {string} 服务路由前缀 */
  urlPrefix;
  /** @type {string} 服务绑定地址（外部访问地址） */
  bindAddress;
  constructor(options) {
    const { name, host, port, urlPrefix, bindAddress } = options || {};
    this.name = _3.defaultTo(name, "game-server");
    this.host = _3.defaultTo(host, "0.0.0.0");
    this.port = _3.defaultTo(port, 5566);
    this.urlPrefix = _3.defaultTo(urlPrefix, "");
    this.bindAddress = bindAddress;
  }
  get addressHost() {
    if (this.bindAddress)
      return this.bindAddress;
    const ipAddresses = util_default.getIPAddressesByIPv4();
    for (let ipAddress of ipAddresses) {
      if (ipAddress === this.host)
        return ipAddress;
    }
    return ipAddresses[0] || "127.0.0.1";
  }
  get address() {
    return `${this.addressHost}:${this.port}`;
  }
  get pageDirUrl() {
    return `http://127.0.0.1:${this.port}/page`;
  }
  get publicDirUrl() {
    return `http://127.0.0.1:${this.port}/public`;
  }
  static load() {
    const external = _3.pickBy(environment_default, (v, k) => ["name", "host", "port"].includes(k) && !_3.isUndefined(v));
    if (!fs3.pathExistsSync(CONFIG_PATH))
      return new _ServiceConfig(external);
    const data = yaml.parse(fs3.readFileSync(CONFIG_PATH).toString());
    return new _ServiceConfig({ ...data, ...external });
  }
};
var service_config_default = ServiceConfig.load();

// src/lib/configs/system-config.ts
import path4 from "path";
import fs4 from "fs-extra";
import yaml2 from "yaml";
import _4 from "lodash";
var CONFIG_PATH2 = path4.join(path4.resolve(), "configs/", environment_default.env, "/system.yml");
var SystemConfig = class _SystemConfig {
  /** 是否开启请求日志 */
  requestLog;
  /** 临时目录路径 */
  tmpDir;
  /** 日志目录路径 */
  logDir;
  /** 日志写入间隔（毫秒） */
  logWriteInterval;
  /** 日志文件有效期（毫秒） */
  logFileExpires;
  /** 公共目录路径 */
  publicDir;
  /** 临时文件有效期（毫秒） */
  tmpFileExpires;
  /** 请求体配置 */
  requestBody;
  /** 是否调试模式 */
  debug;
  constructor(options) {
    const { requestLog, tmpDir, logDir, logWriteInterval, logFileExpires, publicDir, tmpFileExpires, requestBody, debug } = options || {};
    this.requestLog = _4.defaultTo(requestLog, false);
    this.tmpDir = _4.defaultTo(tmpDir, "./tmp");
    this.logDir = _4.defaultTo(logDir, "./logs");
    this.logWriteInterval = _4.defaultTo(logWriteInterval, 200);
    this.logFileExpires = _4.defaultTo(logFileExpires, 262656e4);
    this.publicDir = _4.defaultTo(publicDir, "./public");
    this.tmpFileExpires = _4.defaultTo(tmpFileExpires, 864e5);
    this.requestBody = Object.assign(requestBody || {}, {
      enableTypes: ["json", "form", "text", "xml"],
      encoding: "utf-8",
      formLimit: "10mb",
      jsonLimit: "10mb",
      textLimit: "10mb",
      xmlLimit: "10mb",
      formidable: {
        maxFileSize: "30mb"
      },
      multipart: true,
      parsedMethods: ["POST", "PUT", "PATCH"]
    });
    this.debug = _4.defaultTo(debug, true);
  }
  get rootDirPath() {
    return path4.resolve();
  }
  get tmpDirPath() {
    return path4.resolve(this.tmpDir);
  }
  get logDirPath() {
    return path4.resolve(this.logDir);
  }
  get publicDirPath() {
    return path4.resolve(this.publicDir);
  }
  static load() {
    if (!fs4.pathExistsSync(CONFIG_PATH2))
      return new _SystemConfig();
    const data = yaml2.parse(fs4.readFileSync(CONFIG_PATH2).toString());
    return new _SystemConfig(data);
  }
};
var system_config_default = SystemConfig.load();

// src/lib/configs/api-config.ts
import path5 from "path";
import fs5 from "fs-extra";
import yaml3 from "yaml";
import _5 from "lodash";
var CONFIG_PATH3 = path5.join(path5.resolve(), "configs/", environment_default.env, "/api.yml");
var ChatCompletionConfig = class _ChatCompletionConfig {
  /** 服务提供商 */
  provider;
  /** 调用地址 */
  url;
  /** API密钥 */
  apiKey;
  /** API版本号 */
  apiVersion;
  /** 模型名称 */
  model;
  /** 上下文长度 */
  contextLength;
  /** 单次最大token数 */
  maxToken;
  /** 并行请求数 */
  concurrencyLimit;
  /** 等待响应超时时间（毫秒） */
  waitReponseTimeout;
  /** 网络代理 */
  proxyAgent;
  constructor(options) {
    const { provider, url, apiKey, apiVersion, model, contextLength, concurrencyLimit, waitReponseTimeout, proxyAgent } = options || {};
    this.provider = _5.defaultTo(provider, "zhipuai");
    this.url = _5.defaultTo(url, "https://open.bigmodel.cn/api/paas/v4/chat/completions");
    this.apiKey = _5.defaultTo(apiKey, "");
    this.apiVersion = _5.defaultTo(apiVersion, "");
    this.model = _5.defaultTo(model, "glm-4");
    this.contextLength = _5.defaultTo(contextLength, 131072);
    this.concurrencyLimit = _5.defaultTo(concurrencyLimit, 100);
    this.waitReponseTimeout = _5.defaultTo(waitReponseTimeout, 3e4);
    this.proxyAgent = _5.defaultTo(proxyAgent, null);
  }
  static create(value) {
    return _ChatCompletionConfig.isInstance(value) ? value : new _ChatCompletionConfig(value);
  }
  static isInstance(value) {
    return value instanceof _ChatCompletionConfig;
  }
};
var APIConfig = class _APIConfig {
  /** 聊天补全配置 */
  chatCompletion;
  constructor(options) {
    const { chatCompletion } = options || {};
    this.chatCompletion = ChatCompletionConfig.create(chatCompletion);
  }
  static load() {
    if (!fs5.pathExistsSync(CONFIG_PATH3))
      return new _APIConfig();
    const data = yaml3.parse(fs5.readFileSync(CONFIG_PATH3).toString());
    return new _APIConfig(data);
  }
};
var api_config_default = APIConfig.load();

// src/lib/configs/redis-config.ts
import path6 from "path";
import fs6 from "fs-extra";
import yaml4 from "yaml";
import _6 from "lodash";
var CONFIG_PATH4 = path6.join(path6.resolve(), "configs/", environment_default.env, "/redis.yml");
var RedisConfig = class _RedisConfig {
  /** Redis主机地址 */
  host;
  /** Redis主机端口号 */
  port;
  /** Redis服务密码 */
  password;
  /** Redis主节点名称 */
  name;
  /** Redis哨兵节点设置 */
  sentinels;
  /** 是否懒链接 */
  lazyConnect;
  /** 哨兵重试超时时间 */
  sentinelRetryTimeout;
  /** 连接数据库序号 */
  db;
  constructor(options) {
    const { host, port, password, name, sentinels, lazyConnect, sentinelRetryTimeout, db } = options || {};
    this.host = _6.defaultTo(host, "127.0.0.1");
    this.port = _6.defaultTo(port, 6379);
    this.password = password;
    this.name = name;
    this.sentinels = sentinels;
    this.lazyConnect = _6.defaultTo(lazyConnect, false);
    this.sentinelRetryTimeout = _6.defaultTo(sentinelRetryTimeout, 100);
    this.db = _6.defaultTo(db, 0);
  }
  static load() {
    if (!fs6.pathExistsSync(CONFIG_PATH4))
      return new _RedisConfig();
    const data = yaml4.parse(fs6.readFileSync(CONFIG_PATH4).toString());
    return new _RedisConfig(data);
  }
};
var redis_config_default = RedisConfig.load();

// src/lib/config.ts
var Config = class {
  /** 服务配置 */
  service = service_config_default;
  /** 系统配置 */
  system = system_config_default;
  /** API配置 */
  api = api_config_default;
  /** Redis配置 */
  redis = redis_config_default;
};
var config_default = new Config();

// src/lib/logger.ts
import path7 from "path";
import _util from "util";
import "colors";
import _7 from "lodash";
import fs7 from "fs-extra";
import { format as dateFormat2 } from "date-fns";
var LogWriter = class {
  #buffers = [];
  constructor() {
    fs7.ensureDirSync(config_default.system.logDirPath);
    this.work();
  }
  push(content) {
    const buffer = Buffer.from(content);
    this.#buffers.push(buffer);
  }
  writeSync(buffer) {
    fs7.appendFileSync(path7.join(config_default.system.logDirPath, `/${util_default.getDateString()}.log`), buffer);
  }
  async write(buffer) {
    await fs7.appendFile(path7.join(config_default.system.logDirPath, `/${util_default.getDateString()}.log`), buffer);
  }
  flush() {
    if (!this.#buffers.length)
      return;
    fs7.appendFileSync(path7.join(config_default.system.logDirPath, `/${util_default.getDateString()}.log`), Buffer.concat(this.#buffers));
  }
  work() {
    if (!this.#buffers.length)
      return setTimeout(this.work.bind(this), config_default.system.logWriteInterval);
    const buffer = Buffer.concat(this.#buffers);
    this.#buffers = [];
    this.write(buffer).finally(() => setTimeout(this.work.bind(this), config_default.system.logWriteInterval)).catch((err) => console.error("Log write error:", err));
  }
};
var LogText = class {
  /** @type {string} 日志级别 */
  level;
  /** @type {string} 日志文本 */
  text;
  /** @type {string} 日志来源 */
  source;
  /** @type {Date} 日志发生时间 */
  time = /* @__PURE__ */ new Date();
  constructor(level, ...params) {
    this.level = level;
    this.text = _util.format.apply(null, params);
    this.source = this.#getStackTopCodeInfo();
  }
  #getStackTopCodeInfo() {
    const unknownInfo = { name: "unknown", codeLine: 0, codeColumn: 0 };
    const stackArray = new Error().stack.split("\n");
    const text = stackArray[4];
    if (!text)
      return unknownInfo;
    const match = text.match(/at (.+) \((.+)\)/) || text.match(/at (.+)/);
    if (!match || !_7.isString(match[2] || match[1]))
      return unknownInfo;
    const temp = match[2] || match[1];
    const _match = temp.match(/([a-zA-Z0-9_\-\.]+)\:(\d+)\:(\d+)$/);
    if (!_match)
      return unknownInfo;
    const [, scriptPath, codeLine, codeColumn] = _match;
    return {
      name: scriptPath ? scriptPath.replace(/.js$/, "") : "unknown",
      path: scriptPath || null,
      codeLine: parseInt(codeLine || 0),
      codeColumn: parseInt(codeColumn || 0)
    };
  }
  toString() {
    return `[${dateFormat2(this.time, "yyyy-MM-dd HH:mm:ss.SSS")}][${this.level}][${this.source.name}<${this.source.codeLine},${this.source.codeColumn}>] ${this.text}`;
  }
};
var Logger = class _Logger {
  /** @type {Object} 系统配置 */
  config = {};
  /** @type {Object} 日志级别映射 */
  static Level = {
    Success: "success",
    Info: "info",
    Log: "log",
    Debug: "debug",
    Warning: "warning",
    Error: "error",
    Fatal: "fatal"
  };
  /** @type {Object} 日志级别文本颜色樱色 */
  static LevelColor = {
    [_Logger.Level.Success]: "green",
    [_Logger.Level.Info]: "brightCyan",
    [_Logger.Level.Debug]: "white",
    [_Logger.Level.Warning]: "brightYellow",
    [_Logger.Level.Error]: "brightRed",
    [_Logger.Level.Fatal]: "red"
  };
  #writer;
  constructor() {
    this.#writer = new LogWriter();
  }
  header() {
    this.#writer.writeSync(Buffer.from(`

===================== LOG START ${dateFormat2(/* @__PURE__ */ new Date(), "yyyy-MM-dd HH:mm:ss.SSS")} =====================

`));
  }
  footer() {
    this.#writer.flush();
    this.#writer.writeSync(Buffer.from(`

===================== LOG END ${dateFormat2(/* @__PURE__ */ new Date(), "yyyy-MM-dd HH:mm:ss.SSS")} =====================

`));
  }
  success(...params) {
    const content = new LogText(_Logger.Level.Success, ...params).toString();
    console.info(content[_Logger.LevelColor[_Logger.Level.Success]]);
    this.#writer.push(content + "\n");
  }
  info(...params) {
    const content = new LogText(_Logger.Level.Info, ...params).toString();
    console.info(content[_Logger.LevelColor[_Logger.Level.Info]]);
    this.#writer.push(content + "\n");
  }
  log(...params) {
    const content = new LogText(_Logger.Level.Log, ...params).toString();
    console.log(content[_Logger.LevelColor[_Logger.Level.Log]]);
    this.#writer.push(content + "\n");
  }
  debug(...params) {
    if (!config_default.system.debug)
      return;
    const content = new LogText(_Logger.Level.Debug, ...params).toString();
    console.debug(content[_Logger.LevelColor[_Logger.Level.Debug]]);
    this.#writer.push(content + "\n");
  }
  warn(...params) {
    const content = new LogText(_Logger.Level.Warning, ...params).toString();
    console.warn(content[_Logger.LevelColor[_Logger.Level.Warning]]);
    this.#writer.push(content + "\n");
  }
  error(...params) {
    const content = new LogText(_Logger.Level.Error, ...params).toString();
    console.error(content[_Logger.LevelColor[_Logger.Level.Error]]);
    this.#writer.push(content);
  }
  fatal(...params) {
    const content = new LogText(_Logger.Level.Fatal, ...params).toString();
    console.error(content[_Logger.LevelColor[_Logger.Level.Fatal]]);
    this.#writer.push(content);
  }
  destory() {
    this.#writer.destory();
  }
};
var logger_default = new Logger();

// src/lib/initialize.ts
process.setMaxListeners(Infinity);
process.on("uncaughtException", (err, origin) => {
  logger_default.error(`An unhandled error occurred: ${origin}`, err);
});
process.on("unhandledRejection", (_20, promise) => {
  promise.catch((err) => logger_default.error("An unhandled rejection occurred:", err));
});
process.on("warning", (warning) => logger_default.warn("System warning: ", warning));
process.on("exit", () => {
  logger_default.info("Service exit");
  logger_default.footer();
});
process.on("SIGTERM", () => {
  logger_default.warn("received kill signal");
  process.exit(2);
});
process.on("SIGINT", () => {
  process.exit(0);
});

// src/lib/server.ts
import Koa from "koa";
import KoaRouter from "koa-router";
import koaRange from "koa-range";
import koaCors from "koa2-cors";
import koaBody from "koa-body";
import _13 from "lodash";

// src/lib/exceptions/Exception.ts
import assert from "assert";
import _8 from "lodash";
var Exception = class extends Error {
  /** 错误码 */
  errcode;
  /** 错误消息 */
  errmsg;
  /** 数据 */
  data;
  /** HTTP状态码 */
  httpStatusCode;
  /**
   * 构造异常
   * 
   * @param exception 异常
   * @param _errmsg 异常消息
   */
  constructor(exception, _errmsg) {
    assert(_8.isArray(exception), "Exception must be Array");
    const [errcode, errmsg] = exception;
    assert(_8.isFinite(errcode), "Exception errcode invalid");
    assert(_8.isString(errmsg), "Exception errmsg invalid");
    super(_errmsg || errmsg);
    this.errcode = errcode;
    this.errmsg = _errmsg || errmsg;
  }
  setHTTPStatusCode(value) {
    this.httpStatusCode = value;
    return this;
  }
  setData(value) {
    this.data = _8.defaultTo(value, null);
    return this;
  }
};

// src/lib/request/Request.ts
import _9 from "lodash";

// src/lib/exceptions/APIException.ts
var APIException = class extends Exception {
  /**
   * 构造异常
   * 
   * @param {[number, string]} exception 异常
   */
  constructor(exception, errmsg) {
    super(exception, errmsg);
  }
};

// src/api/consts/exceptions.ts
var exceptions_default = {
  API_TEST: [-9999, "API\u5F02\u5E38\u9519\u8BEF"],
  API_TICKET_EXPIRED: [-2e3, "\u51ED\u8BC1\u5DF2\u8FC7\u671F"],
  API_REQUEST_HAS_BLOCKED: [-2001, "\u8BF7\u6C42\u5DF2\u88AB\u963B\u6B62"],
  API_REQUEST_PARAMS_INVALID: [-2002, "\u8BF7\u6C42\u53C2\u6570\u975E\u6CD5"],
  API_SCENE_NOT_FOUND: [-2003, "\u573A\u666F\u4E0D\u5B58\u5728"]
};

// src/lib/request/Request.ts
var Request = class {
  /** 请求方法 */
  method;
  /** 请求URL */
  url;
  /** 请求路径 */
  path;
  /** 请求载荷类型 */
  type;
  /** 请求headers */
  headers;
  /** 请求原始查询字符串 */
  search;
  /** 请求查询参数 */
  query;
  /** 请求URL参数 */
  params;
  /** 请求载荷 */
  body;
  /** 上传的文件 */
  files;
  /** 客户端IP地址 */
  remoteIP;
  /** 请求接受时间戳（毫秒） */
  time;
  constructor(ctx, options = {}) {
    const { time } = options;
    this.method = ctx.request.method;
    this.url = ctx.request.url;
    this.path = ctx.request.path;
    this.type = ctx.request.type;
    this.headers = ctx.request.headers || {};
    this.search = ctx.request.search;
    this.query = ctx.query || {};
    this.params = ctx.params || {};
    this.body = ctx.request.body || {};
    this.files = ctx.request.files || {};
    this.remoteIP = this.headers["X-Real-IP"] || this.headers["x-real-ip"] || this.headers["X-Forwarded-For"] || this.headers["x-forwarded-for"] || ctx.ip || null;
    this.time = Number(_9.defaultTo(time, util_default.timestamp()));
  }
  validate(key, fn) {
    try {
      const value = _9.get(this, key);
      if (fn) {
        if (fn(value) === false)
          throw `[Mismatch] -> ${fn}`;
      } else if (_9.isUndefined(value))
        throw "[Undefined]";
    } catch (err) {
      logger_default.warn(`Params ${key} invalid:`, err);
      throw new APIException(exceptions_default.API_REQUEST_PARAMS_INVALID, `Params ${key} invalid`);
    }
    return this;
  }
};

// src/lib/response/Response.ts
import mime2 from "mime";
import _11 from "lodash";

// src/lib/response/Body.ts
import _10 from "lodash";
var Body = class _Body {
  /** 状态码 */
  code;
  /** 状态消息 */
  message;
  /** 载荷 */
  data;
  /** HTTP状态码 */
  statusCode;
  constructor(options = {}) {
    const { code, message, data, statusCode } = options;
    this.code = Number(_10.defaultTo(code, 0));
    this.message = _10.defaultTo(message, "OK");
    this.data = _10.defaultTo(data, null);
    this.statusCode = Number(_10.defaultTo(statusCode, 200));
  }
  toObject() {
    return {
      code: this.code,
      message: this.message,
      data: this.data
    };
  }
  static isInstance(value) {
    return value instanceof _Body;
  }
};

// src/lib/response/Response.ts
var Response = class _Response {
  /** 响应HTTP状态码 */
  statusCode;
  /** 响应内容类型 */
  type;
  /** 响应headers */
  headers;
  /** 重定向目标 */
  redirect;
  /** 响应载荷 */
  body;
  /** 响应载荷大小 */
  size;
  /** 响应时间戳 */
  time;
  constructor(body, options = {}) {
    const { statusCode, type, headers, redirect, size, time } = options;
    this.statusCode = Number(_11.defaultTo(statusCode, Body.isInstance(body) ? body.statusCode : void 0));
    this.type = type;
    this.headers = headers;
    this.redirect = redirect;
    this.size = size;
    this.time = Number(_11.defaultTo(time, util_default.timestamp()));
    this.body = body;
  }
  injectTo(ctx) {
    this.redirect && ctx.redirect(this.redirect);
    this.statusCode && (ctx.status = this.statusCode);
    this.type && (ctx.type = mime2.getType(this.type) || this.type);
    const headers = this.headers || {};
    if (this.size && !headers["Content-Length"] && !headers["content-length"])
      headers["Content-Length"] = this.size;
    ctx.set(headers);
    if (Body.isInstance(this.body))
      ctx.body = this.body.toObject();
    else
      ctx.body = this.body;
  }
  static isInstance(value) {
    return value instanceof _Response;
  }
};

// src/lib/response/FailureBody.ts
import _12 from "lodash";

// src/lib/consts/exceptions.ts
var exceptions_default2 = {
  SYSTEM_ERROR: [-1e3, "\u7CFB\u7EDF\u5F02\u5E38"],
  SYSTEM_REQUEST_VALIDATION_ERROR: [-1001, "\u8BF7\u6C42\u53C2\u6570\u6821\u9A8C\u9519\u8BEF"],
  SYSTEM_NOT_ROUTE_MATCHING: [-1002, "\u65E0\u5339\u914D\u7684\u8DEF\u7531"]
};

// src/lib/response/FailureBody.ts
var FailureBody = class _FailureBody extends Body {
  constructor(error, _data) {
    let errcode, errmsg, data = _data, httpStatusCode = http_status_codes_default.OK;
    ;
    if (_12.isString(error))
      error = new Exception(exceptions_default2.SYSTEM_ERROR, error);
    else if (error instanceof APIException || error instanceof Exception)
      ({ errcode, errmsg, data, httpStatusCode } = error);
    else if (_12.isError(error))
      error = new Exception(exceptions_default2.SYSTEM_ERROR, error.message);
    super({
      code: errcode || -1,
      message: errmsg || "Internal error",
      data,
      statusCode: httpStatusCode
    });
  }
  static isInstance(value) {
    return value instanceof _FailureBody;
  }
};

// src/lib/server.ts
var Server = class {
  app;
  router;
  constructor() {
    this.app = new Koa();
    this.app.use(koaCors());
    this.app.use(koaRange);
    this.router = new KoaRouter({ prefix: config_default.service.urlPrefix });
    this.app.use(async (ctx, next) => {
      if (ctx.request.type === "application/xml" || ctx.request.type === "application/ssml+xml")
        ctx.req.headers["content-type"] = "text/xml";
      try {
        await next();
      } catch (err) {
        logger_default.error(err);
        const failureBody = new FailureBody(err);
        new Response(failureBody).injectTo(ctx);
      }
    });
    this.app.use(koaBody(_13.clone(config_default.system.requestBody)));
    this.app.on("error", (err) => {
      if (["ECONNRESET", "ECONNABORTED", "EPIPE", "ECANCELED"].includes(err.code))
        return;
      logger_default.error(err);
    });
    logger_default.success("Server initialized");
  }
  /**
   * 附加路由
   * 
   * @param routes 路由列表
   */
  attachRoutes(routes) {
    routes.forEach((route) => {
      const prefix = route.prefix || "";
      for (let method in route) {
        if (method === "prefix")
          continue;
        if (!_13.isObject(route[method])) {
          logger_default.warn(`Router ${prefix} ${method} invalid`);
          continue;
        }
        for (let uri in route[method]) {
          this.router[method](`${prefix}${uri}`, async (ctx) => {
            const { request, response } = await this.#requestProcessing(ctx, route[method][uri]);
            if (response != null && config_default.system.requestLog)
              logger_default.info(`<- ${request.method} ${request.url} ${response.time - request.time}ms`);
          });
        }
      }
      logger_default.info(`Route ${config_default.service.urlPrefix || ""}${prefix} attached`);
    });
    this.app.use(this.router.routes());
    this.app.use((ctx) => {
      const request = new Request(ctx);
      logger_default.debug(`-> ${ctx.request.method} ${ctx.request.url} request is not supported - ${request.remoteIP || "unknown"}`);
      const failureBody = new FailureBody(new Exception(exceptions_default2.SYSTEM_NOT_ROUTE_MATCHING, "Request is not supported"));
      const response = new Response(failureBody);
      response.injectTo(ctx);
      if (config_default.system.requestLog)
        logger_default.info(`<- ${request.method} ${request.url} ${response.time - request.time}ms`);
    });
  }
  /**
   * 请求处理
   * 
   * @param ctx 上下文
   * @param routeFn 路由方法
   */
  #requestProcessing(ctx, routeFn) {
    return new Promise((resolve) => {
      const request = new Request(ctx);
      try {
        if (config_default.system.requestLog)
          logger_default.info(`-> ${request.method} ${request.url}`);
        routeFn(request).then((response) => {
          try {
            if (!Response.isInstance(response)) {
              const _response = new Response(response);
              _response.injectTo(ctx);
              return resolve({ request, response: _response });
            }
            response.injectTo(ctx);
            resolve({ request, response });
          } catch (err) {
            logger_default.error(err);
            const failureBody = new FailureBody(err);
            const response2 = new Response(failureBody);
            response2.injectTo(ctx);
            resolve({ request, response: response2 });
          }
        }).catch((err) => {
          try {
            logger_default.error(err);
            const failureBody = new FailureBody(err);
            const response = new Response(failureBody);
            response.injectTo(ctx);
            resolve({ request, response });
          } catch (err2) {
            logger_default.error(err2);
            const failureBody = new FailureBody(err2);
            const response = new Response(failureBody);
            response.injectTo(ctx);
            resolve({ request, response });
          }
        });
      } catch (err) {
        logger_default.error(err);
        const failureBody = new FailureBody(err);
        const response = new Response(failureBody);
        response.injectTo(ctx);
        resolve({ request, response });
      }
    });
  }
  /**
   * 监听端口
   */
  async listen() {
    const host = config_default.service.host;
    const port = config_default.service.port;
    await Promise.all([
      new Promise((resolve, reject) => {
        if (host === "0.0.0.0" || host === "localhost" || host === "127.0.0.1")
          return resolve(null);
        this.app.listen(port, "localhost", (err) => {
          if (err)
            return reject(err);
          resolve(null);
        });
      }),
      new Promise((resolve, reject) => {
        this.app.listen(port, host, (err) => {
          if (err)
            return reject(err);
          resolve(null);
        });
      })
    ]);
    logger_default.success(`Server listening on port ${port} (${host})`);
  }
};
var server_default = new Server();

// src/api/routes/conversation.ts
import _18 from "lodash";

// src/api/models/Conversation.ts
import _14 from "lodash";

// src/api/models/Message.ts
var Message = class {
  type;
  id;
  roleAvatarResId;
  roleName;
  content;
  constructor(options) {
    this.type = options.type;
    this.id = options.id || util_default.uuid();
    this.roleAvatarResId = options.roleAvatarResId;
    this.roleName = options.roleName;
    this.content = options.content;
  }
  toCompletionMessage() {
    return {
      role: "user",
      content: this.content
    };
  }
};

// src/lib/redis.ts
import { Redis as IORedis } from "ioredis";
var Redis = class extends IORedis {
  constructor() {
    super({
      ...config_default.redis,
      sentinelRetryStrategy: (times) => Math.min(times * config_default.redis.sentinelRetryTimeout || 100, 1e4)
    });
  }
  async hmget(key, ...fields) {
    if (!await super.exists(key))
      return null;
    const values = await super.hmget(key, ...fields);
    return Object.fromEntries(fields.map((field, index) => [field, values[index]]));
  }
};
var redis_default = new Redis();

// src/api/models/Conversation.ts
var Conversation = class _Conversation {
  id;
  type;
  name;
  messages;
  sceneId;
  fromTicketId;
  constructor(options) {
    this.type = options.type;
    this.id = options.id || util_default.uuid();
    this.name = options.name;
    this.messages = _14.defaultTo(options.messages, []).map((v) => new Message(v));
    this.sceneId = options.sceneId;
    this.fromTicketId = options.fromTicketId;
  }
  toCompletionMessages() {
    return this.messages.map((msg) => msg.toCompletionMessage());
  }
  async save() {
    const pipeline = redis_default.pipeline();
    pipeline.hmset(`conv:${this.id}`, _14.omit(this, "messages"));
    pipeline.del(`msgs:${this.id}`);
    pipeline.lpush(`msgs:${this.id}`, ...this.messages.map((msg) => JSON.stringify(msg)));
    await pipeline.exec();
  }
  static async load(convId) {
    const [convResult, msgsResults] = await Promise.all([
      redis_default.hmget(`conv:${convId}`, "type", "id", "name", "sceneId", "fromTicketId"),
      redis_default.lrange(`msgs:${convId}`, 0, -1)
    ]);
    if (!convResult)
      return null;
    const conv = new _Conversation({
      ...convResult,
      messages: msgsResults.map((result) => JSON.parse(result))
    });
    return conv;
  }
};

// src/api/models/Scene.ts
import _15 from "lodash";
var Scene = class {
  id;
  name;
  description;
  coverResId;
  initialMessages;
  constructor(options) {
    this.id = options.id || util_default.uuid();
    this.name = options.name;
    this.description = options.description;
    this.coverResId = options.coverResId;
    this.initialMessages = _15.defaultTo(options.initialMessages, []).map((v) => new Message(v));
  }
};

// src/api/scenes/gift-redemption-scam.ts
var giftRedemptionScam = class extends Scene {
  constructor() {
    super({
      id: "gift-redemption-scam",
      name: "\u6361\u5230\u5B9D\u4E86",
      description: "\u5802\u5F1F\u5728\u56DE\u5BB6\u8DEF\u4E0A\u610F\u5916\u6361\u5230\u4E00\u5F20\u793C\u54C1\u5151\u6362\u5361\uFF0C\u626B\u63CF\u4E8C\u7EF4\u7801\u53EF\u5728\u7EBF\u5151\u6362\u4E00\u53F0\u9876\u914D\u7684iPhone 15 Pro Max\u624B\u673A\uFF0C\u5174\u594B\u7684\u4E0E\u4F60\u5206\u4EAB\u3002",
      coverResId: "images.scene_gift_redemption_scam",
      initialMessages: []
    });
  }
};
var gift_redemption_scam_default = new giftRedemptionScam();

// src/api/scenes/resume-scam.ts
var ResumeScam = class extends Scene {
  constructor() {
    super({
      id: "resume-scam",
      name: "\u6076\u9B54\u7684\u62DB\u8058",
      description: "\u4F84\u5B50\u5927\u5B66\u6BD5\u4E1A\u5DF2\u7ECF\u4E00\u5E74\uFF0C\u5374\u6CA1\u627E\u5230\u5408\u5FC3\u610F\u7684\u5DE5\u4F5C\uFF0C\u4ECA\u5929\u62DB\u8058\u8F6F\u4EF6\u7A81\u7136\u6536\u5230\u4E00\u5BB6\u516C\u53F8\u53D1\u8D77\u7684\u804C\u4F4D\u6295\u9012\u9080\u8BF7\uFF0C\u5C97\u4F4D\u540D\u79F0\u662F\u201C\u9AD8\u7EA7\u5DE5\u7A0B\u5E08\u201D\uFF0C\u85AA\u8D44\u5F85\u9047\u76F8\u8F83\u540C\u7C7B\u5C97\u4F4D\u90FD\u9AD8\u4E0D\u5C11\uFF0C\u524D\u5F80\u73B0\u573A\u9762\u8BD5\u65F6\uFF0C\u5BF9\u65B9\u8981\u6C42\u5148\u4EA4\u4E00\u7B14\u57F9\u8BAD\u8D39\u7528\uFF0C\u57F9\u8BAD\u540E\u624D\u80FD\u4E0A\u5C97\u3002",
      coverResId: "images.scene_resume_scam"
    });
  }
};
var resume_scam_default = new ResumeScam();

// src/api/scenes/tea-picking-girl-scam.ts
var TeaPickingGirlScam = class extends Scene {
  constructor() {
    super({
      id: "tea-picking-girl-scam",
      name: "\u66FF\u7237\u5356\u8336",
      description: "\u8868\u54E5\u7684\u5FAE\u4FE1\u6536\u5230\u4E00\u6761\u597D\u53CB\u9A8C\u8BC1\u6D88\u606F\uFF0C\u9A8C\u8BC1\u540E\u5BF9\u65B9\u53D1\u6765\u6D88\u606F\uFF1A\u201C\u5C0F\u54E5\u54E5\uFF0C\u4E0D\u597D\u610F\u601D\u597D\u50CF\u52A0\u9519\u4EBA\u4E86\uFF0C\u4E0D\u8FC7\u80FD\u6210\u4E3A\u597D\u53CB\u5C31\u662F\u7F18\u5206\uFF0C\u5C31\u4E0D\u5220\u4E86\u54C8\uFF01\u201D\uFF0C\u8868\u54E5\u901A\u8FC7\u670B\u53CB\u5708\u770B\u5230\u5979\u6B63\u5728\u5E2E\u751F\u75C5\u7684\u7237\u7237\u6253\u7406\u8336\u573A\uFF0C\u7167\u7247\u4E2D\u7684\u5979\u957F\u76F8\u5341\u5206\u4FCA\u4FCF\uFF0C\u5F88\u5FEB\u4E8C\u4EBA\u5F00\u59CB\u4E86\u804A\u5929\u3002\u4E00\u4E2A\u661F\u671F\u540E\uFF0C\u7A81\u7136\u6536\u5230\u4E00\u6761\u6D88\u606F\uFF1A\u201C\u7237\u7237\u7684\u75C5\u6628\u665A\u7A81\u7136\u6076\u5316\uFF0C\u4F46\u662F\u624B\u672F\u8FD8\u5DEE\u4E00\u4E9B\u94B1\uFF0C\u6C42\u54E5\u54E5\u5E2E\u5E2E\u5FD9\u6551\u547D\uFF0C\u4E70\u5341\u7BB1\u8336\u53F6\uFF0C\u8FD9\u4E9B\u90FD\u662F\u7279\u7EA7\u8336\u53F6\uFF01\u201D",
      coverResId: "images.scene_tea_picking_girl_scam"
    });
  }
};
var tea_picking_girl_scam_default = new TeaPickingGirlScam();

// src/api/scenes/brushing-orders-scam.ts
var OnlineShoppingScam = class extends Scene {
  constructor() {
    super({
      id: "brushing-orders-scam",
      name: "\u8D2A\u5C0F\u5931\u5927",
      description: "\u59D0\u59D0\u6536\u5230\u4E00\u4E2A\u964C\u751F\u7684\u5FEB\u9012\uFF0C\u91CC\u9762\u6709\u4E00\u652F\u7B14\u548C\u4E00\u5F20\u201C\u56DE\u9988\u5BA2\u6237\u201D\u7684\u4E8C\u7EF4\u7801\u5361\u7247\uFF0C\u626B\u63CF\u540E\u8FDB\u5165\u4E00\u4E2A\u5237\u5355\u7FA4\uFF0C\u53D1\u73B0\u7FA4\u91CC\u6709\u4EBA\u53D1\u94FE\u63A5\uFF0C\u53EF\u4EE5\u9886\u4EFB\u52A1\u5237\u5355\u8D5A\u94B1\uFF0C\u4E8E\u662F\u4E0B\u8F7D\u4E86\u505A\u4EFB\u52A1\u7684APP\uFF0C\u505A\u4E00\u4E9B\u6DD8\u5B9D\u5237\u5355\u4EFB\u52A1\uFF0C\u8D5A\u5230\u4E86\u56DB\u4E94\u767E\u5143\u94B1\uFF0C\u5E76\u6210\u529F\u63D0\u73B0\u3002\u95F2\u4E0B\u6765\u65F6\u770B\u5230\u7FA4\u91CC\u53C8\u53D1\u5237\u5355\u4EFB\u52A1\uFF0C\u62A2\u5230\u4E86\u4E00\u4E2A1023\u5143\u4EFB\u52A1\u5355\uFF0C\u5F97\u77E5\u5237\u5B8C\u8FDE\u672C\u5E26\u5229\u53EF\u4EE5\u62FF\u52301330\u5143\uFF0C\u5FC3\u91CC\u975E\u5E38\u559C\u60A6\u3002",
      coverResId: "images.scene_brushing_orders_scam"
    });
  }
};
var brushing_orders_scam_default = new OnlineShoppingScam();

// src/api/scenes/internet-dating-scam.ts
var InternetDatingScam = class extends Scene {
  constructor() {
    super({
      id: "internet-dating-scam",
      name: "\u4EA4\u53CB\u9700\u8C28\u614E",
      description: "\u5802\u59B9\u5728\u6E38\u620F\u4E2D\u7ED3\u8BC6\u4E86\u4E00\u4E2A\u7ECF\u5E38\u8BED\u97F3\u966A\u73A9\u7684\u670B\u53CB\uFF0C\u5BF9\u65B9\u5BCC\u6709\u78C1\u6027\u7684\u58F0\u97F3\u548C\u5E7D\u9ED8\u611F\u6210\u529F\u4FD8\u83B7\u4E86\u7684\u5FC3\uFF0C\u5F88\u5FEB\u4E24\u4EBA\u6210\u4E3A\u7537\u5973\u670B\u53CB\uFF0C\u7537\u53CB\u4E5F\u7ECF\u5E38\u7ED9\u5979\u9001\u6E38\u620F\u76AE\u80A4\u548C\u88C5\u5907\uFF0C\u7136\u800C\uFF0C\u4E00\u5929\uFF0C\u7537\u53CB\u7A81\u7136\u63D0\u51FA\u8981\u5979\u5E2E\u5FD9\u6295\u8D44\u4E00\u4E2A\u865A\u62DF\u8D27\u5E01\u9879\u76EE\uFF0C\u58F0\u79F0\u6709\u5185\u5E55\u6D88\u606F\uFF0C\u53EF\u4EE5\u83B7\u5F97\u9AD8\u989D\u56DE\u62A5\u3002\u540C\u65F6\u8FD8\u5C55\u793A\u4E86\u4E00\u4E9B\u770B\u4F3C\u4E13\u4E1A\u7684\u56FE\u8868\u548C\u6570\u636E\u5206\u6790\uFF0C\u4EE5\u53CA\u4E00\u4E9B\u6210\u529F\u7684\u4EA4\u6613\u8BB0\u5F55\u3002",
      coverResId: "images.scene_internet_dating_scam"
    });
  }
};
var internet_dating_scam_default = new InternetDatingScam();

// src/api/scenes/nude-chat-scam.ts
var NudeChatScam = class extends Scene {
  constructor() {
    super({
      id: "nude-chat-scam",
      name: "\u8272\u8FF7\u5FC3\u7A8D",
      description: "\u6DF1\u591C\uFF0C\u5802\u5F1F\u5728\u6E38\u620F\u4E2D\u6536\u5230\u4E00\u6761\u79C1\u4FE1\uFF1A\u201C\u5F1F\u5F1F\uFF0C\u59D0\u59D0\u597D\u65E0\u804A\u597D\u5BC2\u5BDE\uFF0C\u626B\u4E8C\u7EF4\u7801\u4E0B\u8F7D\u8FD9\u4E2AAPP\u8DDF\u6211\u89C6\u9891\u804A\u5929\uFF0C\u6709\u60CA\u559C\u54DF\uFF01\u201D\uFF0C\u201C\u89C6\u9891\u804A\u5929\u201D\u540E\u5BF9\u65B9\u5374\u53D1\u8FC7\u6765\u5802\u5F1F\u624B\u673A\u7684\u901A\u8BAF\u5F55\u5217\u8868\u548C\u5927\u5C3A\u5EA6\u7684\u7167\u7247\u5A01\u80C1\u7D22\u8981\u201C\u5C01\u53E3\u8D39\u201D5000\u5143\u3002",
      coverResId: "images.scene_nude_chat_scam"
    });
  }
};
var nude_chat_scam_default = new NudeChatScam();

// src/api/scenes/lost-express-scam.ts
var LostExpressScam = class extends Scene {
  constructor() {
    super({
      id: "lost-express-scam",
      name: "\u6211\u5FEB\u9012\u4E22\u4E86\uFF1F",
      description: "\u59B9\u59B9\u63A5\u5230\u5FEB\u9012\u516C\u53F8\u5BA2\u670D\u7535\u8BDD\uFF0C\u79F0\u5305\u88F9\u5728\u8F6C\u8FD0\u8FC7\u7A0B\u4E2D\u4E22\u5931\uFF0C\u6839\u636E\u516C\u53F8\u89C4\u5B9A\u9700\u8981\u8FDB\u884C\u53CC\u500D\u7406\u8D54\uFF0C\u5BF9\u65B9\u51C6\u786E\u7684\u8BF4\u51FA\u4E86\u5FEB\u9012\u5355\u53F7\u548C\u6536\u4EF6\u4EBA\u4FE1\u606F\uFF0C\u9700\u8981\u4E0B\u8F7D\u6307\u5B9A\u7684\u7406\u8D54APP\u5E76\u8FDB\u884C\u5C4F\u5E55\u5171\u4EAB\u6307\u5BFC\u64CD\u4F5C\u3002",
      coverResId: "images.scene_lost_express_scam"
    });
  }
};
var lost_express_scam_default = new LostExpressScam();

// src/api/scenes/family-accident-scam.ts
var FamilyAccidentScam = class extends Scene {
  constructor() {
    super({
      id: "family-accident-scam",
      name: "\u5988\uFF01\u6211\u51FA\u8F66\u7978\u4E86",
      description: "\u5E38\u5E74\u5728\u5916\u5DE5\u4F5C\u7684\u8868\u59B9\u7A81\u7136\u7ED9\u8205\u5988\u6253\u6765\u7535\u8BDD\uFF1A\u201C\u5988\uFF01\u6211\u51FA\u8F66\u7978\u4E86\uFF01\u8981\u7D27\u6025\u624B\u672F\uFF0C\u533B\u9662\u6536\u6B3E\u8D26\u53F7\u5DF2\u7ECF\u53D1\u7ED9\u4F60\u4E86\uFF0C\u8981\u5148\u62532\u4E07\u5757\u94B1\uFF01\u201D\uFF0C\u542C\u7B52\u4E2D\u786E\u5B9E\u662F\u5973\u513F\u7684\u58F0\u97F3\uFF0C\u4E5F\u8BB8\u662F\u53D7\u4E86\u91CD\u4F24\u58F0\u97F3\u542C\u4E0A\u53BB\u6709\u4E9B\u5636\u54D1\u3002",
      coverResId: "images.scene_family_accident_scam"
    });
  }
};
var family_accident_scam_default = new FamilyAccidentScam();

// src/api/scenes/mental-manipulation-scam.ts
var MentalManipulationScam = class extends Scene {
  constructor() {
    super({
      id: "mental-manipulation-scam",
      name: "\u63D0\u7EBF\u6728\u5076",
      description: "\u5927\u54E5\u6BCF\u5929\u62B1\u7740\u624B\u673A\u804A\u5929\uFF0C\u636E\u8BF4\u5728\u548C\u7F51\u4E0A\u521A\u5904\u7684\u5973\u53CB\u804A\u5929\uFF0C\u5C31\u662F\u60C5\u7EEA\u4E0D\u592A\u7A33\u5B9A\uFF0C\u65F6\u800C\u60B2\u4F24\u6CAE\u4E27\u3001\u65F6\u800C\u5FEB\u4E50\u5174\u594B\uFF0C\u8FD1\u6765\u8FD8\u627E\u4E86\u8BB8\u591A\u4EBA\u501F\u94B1\uFF0C\u521A\u521A\u8FC7\u6765\u627E\u4F60\uFF1A\u201C\u8001\u4E09\uFF0C\u6709\u95F2\u94B1\u4E0D\uFF0C\u5973\u670B\u53CB\u8BF4\u518D\u8F6C5000\u7ED9\u4ED6\u4E70\u4E2A\u5305\uFF0C\u6211\u8FD8\u5DEE1300\uFF0C\u5979\u8FC7\u4E24\u4E2A\u6708\u5C31\u6765\u89C1\u6211\u4E86\uFF01\u201D",
      coverResId: "images.scene_mental_manipulation_scam"
    });
  }
};
var mental_manipulation_scam_default = new MentalManipulationScam();

// src/api/scenes/impersonating-public-security-procuratorate-scam.ts
var ImpersonatingPublicSecurityProcuratorateScam = class extends Scene {
  constructor() {
    super({
      id: "impersonating-public-security-procuratorate-scam",
      name: "\u5582\uFF1F\u6211\u662F\u8B66\u5BDF\uFF01",
      description: "\u5728\u5916\u5DE5\u4F5C\u7684\u54E5\u54E5\u7A81\u7136\u63A5\u5230\u7535\u8BDD\uFF0C\u5BF9\u65B9\u81EA\u79F0\u6240\u5728\u8F96\u533A\u6D3E\u51FA\u6240\u6C11\u8B66\uFF0C\u4E00\u8D77\u8BC8\u9A97\u6D17\u94B1\u72AF\u7F6A\u4E0E\u4ED6\u6709\u5173\uFF0C\u9700\u8981\u914D\u5408\u8C03\u67E5\uFF0C\u8981\u6C42\u4E0B\u8F7D\u89C6\u9891\u4F1A\u8BAEAPP\u5E76\u8FDB\u884C\u5C4F\u5E55\u5171\u4EAB\uFF0C\u9A8C\u8BC1\u8D44\u91D1\u60C5\u51B5\u540E\u8F6C\u5165\u4E34\u65F6\u5B89\u5168\u8D26\u6237\u3002",
      coverResId: "images.scene_impersonating_public_security_procuratorate_scam"
    });
  }
};
var impersonating_public_security_procuratorate_scam_default = new ImpersonatingPublicSecurityProcuratorateScam();

// src/api/scenes/online-loan-scam.ts
var OnlineLoanScam = class extends Scene {
  constructor() {
    super({
      id: "online-loan-scam",
      name: "\u88AB\u5957\u8DEF\u8D37\u5305\u56F4\u4E86",
      description: "\u5C0F\u59D1\u662F\u6708\u5149\u65CF\uFF0C\u524D\u6BB5\u65F6\u95F4\u4FE1\u7528\u5361\u4E5F\u5237\u7206\u4E86\uFF0C\u521A\u521A\u6536\u5230\u77ED\u4FE1\uFF1A\u201C\u5C0A\u656C\u7684\u5BA2\u6237\uFF0C\u7531\u4E8E\u653F\u7B56\u653E\u5BBD\uFF0C\u60A8\u5728\u6211\u884C\u53EF\u529E\u7406498000\u5143\u501F\u6B3E\uFF0C\u53EF\u7528\u4E8E\u65E5\u5E38\u6D88\u8D39\u3001\u751F\u610F\u5468\u8F6C\u3001\u623F\u5C4B\u88C5\u4FEE\uFF0C\u7533\u8BF7\u8BF7\u56DE\u590D1\u3002\u201D",
      coverResId: "images.scene_online_loan_scam"
    });
  }
};
var online_loan_scam_default = new OnlineLoanScam();

// src/api/scenes/mlm-scam.ts
var MLMScam = class extends Scene {
  constructor() {
    super({
      id: "mlm-scam",
      name: "\u8C01\u662F\u63A5\u76D8\u4FA0\uFF1F",
      description: "\u8868\u5F1F\u6536\u5230\u670B\u53CB\u53D1\u6765\u7684\u6D88\u606F\uFF1A\u201C\u6211\u5728XX\u5546\u57CE\u62A2\u8D2D\u8FDB\u53E3\u7EA2\u9152\u7136\u540E\u8F6C\u624B\u8D5A\u5DEE\u4EF7\uFF0C\u95F2\u7740\u6CA1\u4E8B\u64CD\u4F5C\u64CD\u4F5C\u4E00\u4E2A\u6708\u5DF2\u7ECF\u8D5A\u4E86\u4E24\u4E07\u591A\u4E86\uFF0C\u5FEB\u53BB\u4E0B\u8F7DAPP\u4E0A\u8F66\u554A\uFF01\u201D\uFF0C\u63A5\u7740\u53D1\u6765\u4E0B\u8F7DAPP\u7684\u4E8C\u7EF4\u7801\u3002",
      coverResId: "images.scene_mlm_scam"
    });
  }
};
var mlm_scam_default = new MLMScam();

// src/api/scenes/ai-vtuber-scam.ts
var AIVtuberScam = class extends Scene {
  constructor() {
    super({
      id: "ai-vtuber-scam",
      name: "\u4EA6\u771F\u4EA6\u5047",
      description: "\u8001\u7238\u7684\u597D\u53CB\u53D1\u6765\u4E00\u6761\u94FE\u63A5\uFF1A\u201CXX\u9080\u8BF7\u60A8\u89C6\u9891\u901A\u8BDD\uFF0C\u8BF7\u5C3D\u5FEB\u70B9\u51FB\u63A5\u542C\u201D\uFF0C\u70B9\u51FB\u540E\u5C4F\u5E55\u5374\u6620\u5165\u4E86\u81EA\u5DF1\u5F1F\u5F1F\u7684\u8138\uFF0C\u867D\u7136\u611F\u89C9\u5F88\u5947\u602A\uFF0C\u4F46\u662F\u8FD9\u8138\u786E\u5B9E\u4E00\u6A21\u4E00\u6837\uFF0C\u751A\u81F3\u58F0\u97F3\u4E5F\u4E00\u6837\uFF0C\u5F88\u5FEB\u5C31\u6253\u6D88\u4E86\u56F0\u60D1\uFF0C\u201C\u5F1F\u5F1F\u201D\u8BF4\uFF1A\u201C\u5927\u54E5\uFF0C\u6211\u5FAE\u4FE1\u88AB\u5C01\u53F7\u4E86\uFF0C\u7528\u6211\u670B\u53CB\u7684\u5FAE\u4FE1\u8DDF\u4F60\u804A\u3002\u6211\u51C6\u5907\u4E70\u8F66\uFF0C\u73B0\u5728\u5728\u94F6\u884C\u529E\u8D37\u6B3E\uFF0C\u94F6\u884C\u8BF4\u8981\u9A8C\u8BC1\u6211\u7684\u8D44\u91D1\u518D\u786E\u5B9A\u7ED9\u6211\u653E\u8D37\uFF0C\u5148\u8F6C10\u4E07\u5757\u5230\u6211\u53D1\u7ED9\u4F60\u7684\u94F6\u884C\u5361\u8D26\u53F7\uFF0C\u9A8C\u5B8C\u540E\u6211\u518D\u8F6C\u56DE\u7ED9\u4F60\uFF01\u8981\u572810\u5206\u949F\u5185\u8F6C\u5B8C\uFF0C\u4E0D\u7136\u5C31\u8981\u7B49\u4E00\u5468\u540E\u4E86\uFF01\u201D",
      coverResId: "images.scene_ai_vtuber_scam"
    });
  }
};
var ai_vtuber_scam_default = new AIVtuberScam();

// src/api/scenes/pension-product-scam.ts
var PensionProductScam = class extends Scene {
  constructor() {
    super({
      id: "pension-product-scam",
      name: "\u4F55\u4EE5\u517B\u8001",
      description: "\u5C0F\u533A\u9644\u8FD1\u7A81\u7136\u6446\u8D77\u4E86\u7EA2\u5E03\u684C\uFF0C\u4E00\u5E45\u5199\u7740\u201C\u517B\u8001\u9662\u5DE5\u7A0B\u7B79\u5EFA\u201D\u6A2A\u5E45\u7AD6\u7ACB\u5728\u4E2D\u592E\uFF0C\u51E0\u4E2A\u201C\u5DE5\u4F5C\u4EBA\u5458\u201D\u7AD9\u5728\u524D\u9762\u5411\u8FC7\u5F80\u7684\u8001\u5E74\u4EBA\u53D1\u653E\u4F20\u5355\uFF0C\u7237\u7237\u62FF\u7740\u4F20\u5355\u56DE\u6765\uFF1A\u201C\u4F60\u4EEC\u770B\u8FD9\u4E2A\u517B\u8001\u9662\u9879\u76EE\uFF0C\u53EA\u8981\u6295\u8D445\u4E07\u4EE5\u4E0A\u5C31\u53EF\u4EE5\u5165\u80A1\uFF0C\u5EFA\u6210\u540E\u53EF\u4EE5\u514D\u8D39\u5165\u4F4F\uFF0C\u8FD8\u53EF\u4EE5\u83B7\u5F97\u5206\u7EA2\u548C\u6C7D\u8F66\u5956\u52B1\uFF01\u201D",
      coverResId: "images.scene_pension_product_scam"
    });
  }
};
var pension_product_scam_default = new PensionProductScam();

// src/api/scenes/health-product-scam.ts
var HealthProductScam = class extends Scene {
  constructor() {
    super({
      id: "health-product-scam",
      name: "\u5305\u6CBB\u767E\u75C5",
      description: "\u9644\u8FD1\u7684\u95F2\u7F6E\u5382\u623F\u7A81\u7136\u70ED\u95F9\u8D77\u6765\uFF0C\u5976\u5976\u62FF\u7740\u4E00\u5F20\u4FDD\u5065\u54C1\u5BA3\u4F20\u6D77\u62A5\u56DE\u5230\u5BB6\uFF1A\u201C\u5BF9\u9762\u90A3\u6765\u4E86\u4E2A\u4E2D\u79D1\u9662\u9662\u58EB\uFF01\u8BB2\u5F97\u597D\u4E13\u4E1A\uFF01\u8FD8\u6709\u6B3E\u9650\u91CF\u5341\u74F6\u7684\u9632\u764C\u836F\uFF0C\u4E0D\u8DDF\u4F60\u8BF4\u4E86\u6211\u8981\u53BB\u62FF\u70B9\u73B0\u91D1\uFF01\u201D",
      coverResId: "images.scene_health_product_scam"
    });
  }
};
var health_product_scam_default = new HealthProductScam();

// src/api/scenes/witch-scam.ts
var WitchScam = class extends Scene {
  constructor() {
    super({
      id: "witch-scam",
      name: "\u5FC3\u4E2D\u6709\u9B3C",
      description: "\u5927\u59E8\u4E00\u5BB6\u4EBA\u51FA\u56FD\u65C5\u6E38\u5F52\u6765\u4E0D\u5230\u4E24\u5468\uFF0C\u8868\u4F84\u5973\u7A81\u7136\u53D1\u70E7\uFF0C\u62D2\u7EDD\u53BB\u533B\u9662\uFF0C\u6027\u683C\u53D8\u5F97\u5341\u5206\u6267\u62D7\uFF0C\u773C\u795E\u7A7A\u6D1E\uFF0C\u524D\u8A00\u4E0D\u642D\u540E\u8BED\u7ECF\u5E38\u8BF4\u80E1\u8BDD\uFF0C\u5BB6\u91CC\u4EBA\u90FD\u8BF4\u201C\u4E2D\u90AA\u201D\uFF0C\u662F\u5728\u56FD\u5916\u78B0\u4E0A\u201C\u810F\u4E1C\u897F\u201D\u4E86\uFF0C\u51C6\u5907\u8BF7\u4E00\u4F4D\u795E\u5A46\u8FC7\u6765\u770B\u770B\uFF0C\u4F46\u4F60\u4ECE\u7F51\u4E0A\u67E5\u8BE2\u8D44\u6599\u6000\u7591\u8868\u4F84\u5973\u53EF\u80FD\u662F\u60A3\u4E0A\u8111\u708E\u3002",
      coverResId: "images.scene_witch_scam"
    });
  }
};
var witch_scam_default = new WitchScam();

// src/api/scenes/index.ts
var scenes = [
  // 礼品兑换骗局
  gift_redemption_scam_default,
  // 招聘骗局
  resume_scam_default,
  // 采茶女骗局
  tea_picking_girl_scam_default,
  // 刷单骗局
  brushing_orders_scam_default,
  // 网络交友骗局
  internet_dating_scam_default,
  // 裸聊骗局
  nude_chat_scam_default,
  // 快递丢失骗局
  lost_express_scam_default,
  // 家人意外骗局
  family_accident_scam_default,
  // 精神操控骗局
  mental_manipulation_scam_default,
  // 冒充公检法骗局
  impersonating_public_security_procuratorate_scam_default,
  // 网贷骗局
  online_loan_scam_default,
  // 传销骗局
  mlm_scam_default,
  // AI数字人骗局
  ai_vtuber_scam_default,
  // 养老产品骗局
  pension_product_scam_default,
  // 保健品骗局
  health_product_scam_default,
  // 神婆骗局
  witch_scam_default
];
var _scenesMap = {};
scenes.forEach((scene) => _scenesMap[scene.id] = scene);
var scenesMap = _scenesMap;

// src/lib/chat.ts
import ZhipuAI from "zhipuai-sdk-nodejs-v4";
var Chat = class {
  client;
  constructor() {
    this.client = new ZhipuAI({
      apiKey: config_default.api.chatCompletion.apiKey
    });
  }
  async completions(messages) {
    const { model } = config_default.api.chatCompletion;
    const result = await this.client.createCompletions({
      model,
      messages
    });
    console.log(result);
  }
};
var chat_default = new Chat();

// src/api/controllers/conversation.ts
async function query(convId) {
  return await Conversation.load(convId);
}
async function create(options) {
  const scene = getScene(options.sceneId);
  const conv = new Conversation({
    ...options,
    type: "scene",
    name: scene.name,
    messages: scene.initialMessages
  });
  await conv.save();
  return conv;
}
async function completion(convId, content) {
  const conv = await query(convId);
  conv.messages.push(new Message({
    type: "self",
    roleName: "",
    roleAvatarResId: "",
    content: "\u60A8\u597D"
  }));
  const messages = conv.toCompletionMessages();
  await chat_default.completions(messages);
}
function getScene(sceneId) {
  const scene = scenesMap[sceneId];
  if (!scene)
    throw new APIException(exceptions_default.API_SCENE_NOT_FOUND);
  return scene;
}
var conversation_default = {
  query,
  create,
  completion
};

// src/api/controllers/auth.ts
import _17 from "lodash";

// src/api/models/Ticket.ts
import _16 from "lodash";
var Ticket = class _Ticket {
  /** 凭据ID */
  id;
  /** 用户名 */
  username;
  /** IP地址 */
  ipAddress;
  /** 旧的IP地址列表 */
  oldIPAddresses;
  /** IP地址切换时间间隔列表 */
  ipAddressSwitchTimeIntervals;
  /** 创建时间 */
  createTime;
  constructor(options) {
    const { id, username, ipAddress, oldIPAddresses, ipAddressSwitchTimeIntervals, createTime } = options;
    this.id = _16.defaultTo(id, util_default.uuid());
    this.username = username;
    this.ipAddress = ipAddress;
    this.oldIPAddresses = _16.defaultTo(oldIPAddresses, []);
    this.ipAddressSwitchTimeIntervals = _16.defaultTo(ipAddressSwitchTimeIntervals, []);
    this.createTime = _16.defaultTo(createTime, util_default.unixTimestamp());
  }
  async save() {
    await redis_default.hmset(`tk:${this.id}`, {
      ...this,
      oldIPAddresses: JSON.stringify(this.oldIPAddresses),
      ipAddressSwitchTimeIntervals: JSON.stringify(this.ipAddressSwitchTimeIntervals),
      createTime: `${this.createTime}`
    });
  }
  static async load(id) {
    const data = await redis_default.hmget(`tk:${id}`, "id", "username", "ipAddress", "oldIPAddresses", "ipAddressSwitchTimeIntervals", "createTime");
    if (data == null)
      return null;
    const { oldIPAddresses, ipAddressSwitchTimeIntervals, createTime } = data;
    return new _Ticket({
      ...data,
      oldIPAddresses: JSON.parse(oldIPAddresses),
      ipAddressSwitchTimeIntervals: JSON.parse(ipAddressSwitchTimeIntervals),
      createTime: Number(createTime)
    });
  }
  toMaskedData() {
    return _16.omit(this, "ipAddress", "oldIPAddresses", "ipAddressSwitchTimeIntervals");
  }
};

// src/api/controllers/auth.ts
var blockedIPAddresses = [];
async function createTicket(options = {}) {
  const { username, ipAddress } = options;
  const ticket = new Ticket({
    username,
    ipAddress
  });
  await ticket.save();
  return ticket;
}
async function checkTicket(request) {
  const ticketId = request.headers["ticket"];
  if (!_17.isString(ticketId) || !/^[a-z0-9\-]{36}$/.test(ticketId))
    throw new APIException(exceptions_default.API_TICKET_EXPIRED);
  if (blockedIPAddresses.indexOf(request.remoteIP) != -1)
    throw new APIException(exceptions_default.API_REQUEST_HAS_BLOCKED);
  const ticket = await Ticket.load(ticketId);
  if (ticket == null)
    throw new APIException(exceptions_default.API_TICKET_EXPIRED);
  if (request.remoteIP && request.remoteIP != ticket.ipAddress) {
    ticket.oldIPAddresses.push(ticket.ipAddress);
    ticket.ipAddress = request.remoteIP;
    const totalInterval = ticket.ipAddressSwitchTimeIntervals.reduce(
      (total, interval) => total + interval,
      0
    );
    if (ticket.ipAddressSwitchTimeIntervals.length >= 10) {
      const averageInterval = totalInterval / ticket.ipAddressSwitchTimeIntervals.length;
      if (averageInterval < 1800) {
        [...ticket.oldIPAddresses, ticket.ipAddress].forEach(
          (ip) => blockedIPAddresses.push(ip)
        );
        logger_default.warn("\u963B\u6B62IP\u5730\u5740\u540D\u5355\uFF1A", blockedIPAddresses);
        throw new APIException(exceptions_default.API_REQUEST_HAS_BLOCKED);
      }
      ticket.ipAddressSwitchTimeIntervals.shift();
    }
    ticket.ipAddressSwitchTimeIntervals.push(
      util_default.unixTimestamp() - (ticket.createTime + totalInterval)
    );
  }
  await ticket.save();
  return ticket;
}
var auth_default = {
  createTicket,
  checkTicket
};

// src/api/routes/conversation.ts
var conversation_default2 = {
  prefix: "/conversation",
  get: {
    "/:id": async (request) => {
      await auth_default.checkTicket(request);
      request.validate("params.id", _18.isString);
      const { id: convId } = request.params;
      const conv = await conversation_default.query(convId);
      return conv;
    }
  },
  post: {
    "/create": async (request) => {
      const ticket = await auth_default.checkTicket(request);
      request.validate("body.sceneId", _18.isString);
      const { sceneId } = request.body;
      const conv = await conversation_default.create({
        sceneId,
        fromTicketId: ticket.id
      });
      return conv;
    },
    "/:id/completion": async (request) => {
      await auth_default.checkTicket(request);
      request.validate("body.content", _18.isString);
      const { content } = request.body;
    }
  }
};

// src/api/routes/ticket.ts
import _19 from "lodash";
var ticket_default = {
  prefix: "/ticket",
  post: {
    "/create": async (request) => {
      const { username } = request.body;
      request.validate("body.username", _19.isString);
      const _ticket = await auth_default.createTicket({
        username,
        ipAddress: request.remoteIP
      });
      return _ticket.toMaskedData();
    }
  }
};

// src/api/routes/index.ts
var routes_default = [
  conversation_default2,
  ticket_default
];

// src/index.ts
var startupTime = performance.now();
(async () => {
  logger_default.header();
  util_default.printLogo();
  logger_default.info("<<<< save family server >>>>");
  logger_default.info("Version:", environment_default.package.version);
  logger_default.info("Process id:", process.pid);
  logger_default.info("Environment:", environment_default.env);
  logger_default.info("Service name:", config_default.service.name);
  server_default.attachRoutes(routes_default);
  await server_default.listen();
  config_default.service.bindAddress && logger_default.success("service bind address:", config_default.service.bindAddress);
})().then(
  () => logger_default.success(
    `Service startup completed (${Math.floor(performance.now() - startupTime)}ms)`
  )
).catch((err) => console.error(err));
//# sourceMappingURL=index.js.map