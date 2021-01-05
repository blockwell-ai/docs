<template>
    <footer class="main-footer">
        <div class="logo-wrap">
            <img src="/logo-footer.png">
        </div>
        <div class="footer-social">
            <h4>CONNECT WITH US</h4>
            <div class="social">
                <a href="http://t.me/Blockwell" target="_blank"><img src="/social-telegram.png"
                                                                     alt="Telegram"></a>
                <a href="https://twitter.com/Blockwell_HQ" target="_blank"><img src="/social-twitter.png"
                                                                                alt="Twitter"></a>
                <a href="https://www.facebook.com/BlockwellHQ/" target="_blank"><img
                        src="/social-facebook.png" alt="Facebook"></a>
                <a href="https://www.youtube.com/channel/UCk5mQ46_8VCKSzxoAZlNMjg" target="_blank"><img
                        src="/social-youtube.png" alt="YouTube"></a>
                <a href="https://www.instagram.com/blockwell_hq/" target="_blank"><img
                        src="/social-instagram.png" alt="Instagram"></a>
                <a href="https://medium.com/@blockwell.marketing" target="_blank"><img
                        src="/social-medium.png" alt="Medium"></a>
            </div>
        </div>
        <div class="footer-newsletter">
            <h4>SUBSCRIBE TO THE BLOCKWELL NEWSLETTER TO RECEIVE UPDATES AND VALUABLE RESOURCES</h4>
            <div class="newsletter">
                <!-- Begin MailChimp Signup Form -->
                <form action="https://novoamedia.us17.list-manage.com/subscribe/post?u=41f1572bef210ffd497118e79&amp;id=ccefeee897"
                      method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate"
                      target="_blank" novalidate>
                    <div id="mc_embed_signup_scroll">
                        <div class="mc-field-group">
                            <input placeholder="Enter your email" type="email" value="" name="EMAIL" class="required email"
                                   id="mce-EMAIL">
                            <input type="submit" value="GET UPDATES" name="subscribe" id="mc-embedded-subscribe"
                                   class="newsletter-button">
                        </div>
                        <div style="position: absolute; left: -5000px;" aria-hidden="true">
                            <input type="text" name="b_41f1572bef210ffd497118e79_ccefeee897" tabindex="-1" value="">
                        </div>
                    </div>
                </form>
                <!--End mc_embed_signup-->
            </div>
            <div class="copyright">&copy; {{year}} Blockwell</div>
        </div>
    </footer>
</template>

<script>
    export default {
        computed: {
            year() { return new Date().getFullYear() }
        }
    }
</script>

<style lang="scss">
    @import '../styles/config';

    .newsletter {
        position: relative;
        margin: 15px 30px 0 35px;

        .mc-field-group {
            display: flex;
        }

        input {
            flex: 1 1 auto;
        }

        input[type=email] {
            width: 300px;
            height: 50px;
            box-sizing: border-box;
            background: none;
            border: 2px solid $primary !important;
            padding-left: 24px;
            color: #eee;
            font-family: Roboto, "Helvetica Neue", sans-serif;
            font-size: 18px;
            line-height: 18px;
        }

        input[type=submit] {
            font-family: Roboto, "Helvetica Neue", sans-serif;
            font-size: 14px;
            height: 50px;
            background: $primary none;
            border: none;
            color: $light;
            margin: 0;
            font-weight: 700;
            cursor: pointer;

            @media screen and (min-width: 960px) {
                min-width: 160px;
            }
        }

        ::placeholder {
            color: #aaa;
        }

        div.mce_inline_error {
            position: absolute;
            bottom: -30px;
            left: 0;
        }

        #mce-success-response, #mce-error-response {
            position: absolute;
            top: 100%;
            left: 5px;

            a {
                color: $light;
            }
        }
    }
    .main-footer {
        background: $dark url("../../public/bg1.png") center top;
        display: flex;
        align-items: flex-start;
        justify-content: center;
        padding: 60px 0 40px;
        border-bottom: 5px solid $primary;
        color: $light;

        a {
            text-decoration: none;
        }

        h4 {
            color: $light;
            margin: 0 0 20px;
            font-size: 16px;
        }

        .logo-wrap {
            flex: 1 1 auto;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .footer-social {
            flex: 1.2 1 auto;
            a {
                margin: 0 6px 0 0;
            }

            .social {
                margin-bottom: 30px;
            }
        }

        .footer-newsletter {
            max-width: 540px;
            flex: 1 1 auto;
            padding-right: 80px;

            h4 {
                text-align: center;
            }
            .newsletter {
                margin: 0;

                input[type=email] {
                    background: #d8d8d8;
                    color: #333;
                }

                input[type=submit] {
                    height: 50px;
                }

                ::placeholder {
                    color: #777;
                }
            }
        }

        .copyright {
            font-family: sans-serif;
            font-size: 12px;
            margin-top: 12px;
            text-align: right;
            color: $primary;
        }

        @media screen and (max-width: 1134px) {
            flex-wrap: wrap;
            .logo-wrap {
                width: 33%;
            }

            .footer-newsletter {
                padding-right: 0;
                margin-top: 50px;
            }
        }

        @media screen and (max-width: 425px) {
            .footer-social {
                padding: 40px 20px 0;

                .social {
                    display: flex;
                    justify-content: space-between;
                }
            }
            .footer-newsletter {
                padding: 0 20px;
                .newsletter {

                    input[type=email] {
                        width: 150px;
                        font-size: 14px;
                    }
                    input[type=submit] {
                        width: 100px;
                        font-size: 14px;
                    }
                }
            }
        }
    }
</style>
