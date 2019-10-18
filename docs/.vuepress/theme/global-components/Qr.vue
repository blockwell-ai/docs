<template>
    <div class="qrcode">
        <h4><slot></slot></h4>
        <div class="qrcode-image-wrap">
            <img :src="image" :alt="url">
        </div>
        <div class="qrcode-link">
            <span>Deep Link</span> <a :href="url" target="_blank">{{url}}</a>
        </div>
        <v-popover class="qr-help">
            <i class="material-icons tooltip-target">help</i>
            <template slot="popover">
                <p>
                    QR Codes are used with the <a href="/qr/">Blockwell-QR</a> system.
                    <a href="/qr/getting-started.html">Click here</a> to learn how to use them.
                </p>
            </template>
        </v-popover>
    </div>
</template>

<script>
    import { VTooltip, VPopover, VClosePopover } from 'v-tooltip'

    export default {
        directives: {VTooltip},
        components: {VPopover},
        props: {
            code: {
                type: String,
                required: true
            },
            query: String,
            title: String
        },
        computed: {
            url() {
                let url = `https://qr.blockwell.ai/${this.code}`;
                if (this.query) {
                    url += `?${this.query}`;
                }
                return url;
            },
            image() {
                let url = `https://qr.blockwell.ai/${this.code}/image`;
                if (this.query) {
                    url += `?${this.query}`;
                }
                return url;
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../styles/config';
    @import "~@material/elevation/mdc-elevation";

    .qrcode {
        margin: 24px 0;
        padding: 25px 16px 16px;
        @include mdc-elevation(4, #666);
        width: 300px;
        display: flex;
        flex-direction: column;
        align-items: center;
        border-left: 3px solid $primary;
        position: relative;

        h4 {
            margin: 0;
        }

        .qrcode-image-wrap img {
            max-width: 250px;
            width: 100%;
        }

        .qrcode-link {
            span {
                display: block;
                font-size: 0.7rem;
                text-align: center;
            }
            a {
                font-size: 0.8rem;
            }
        }

        .qr-help {
            position: absolute;
            top: 0;
            right: 0;
            font-size: 1.5rem;
            padding-right: 5px;
            padding-top: 5px;
            cursor: pointer;

            i {
                color: #999;
            }
        }

        @media (max-width: $MQMobile) {
            width: 100%;
            box-sizing: border-box;
        }
    }
</style>
